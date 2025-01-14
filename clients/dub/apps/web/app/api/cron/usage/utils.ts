import {
  APP_DOMAIN_WITH_NGROK,
  capitalize,
  getAdjustedBillingCycleStart,
  linkConstructor,
  log,
} from "@dub/utils";

import { getAnalytics } from "@/lib/analytics/get-analytics";
import { qstash } from "@/lib/cron";
import { limiter } from "@/lib/cron/limiter";
import { sendLimitEmail } from "@/lib/cron/send-limit-email";
import type { WorkspaceProps } from "@/lib/types";
import { BusinessConfig as platform } from "@dub/platform-config";
import { prisma } from "@dub/prisma";
import { sendEmail } from "emails";
import ClicksSummary from "emails/clicks-summary";

const limit = 100;

export const updateUsage = async () => {
  const workspaces = await prisma.project.findMany({
    where: {
      // Check only workspaces that haven't been checked in the last 12 hours
      usageLastChecked: {
        lt: new Date(new Date().getTime() - 12 * 60 * 60 * 1000),
      },
    },
    include: {
      users: {
        select: {
          user: true,
        },
        where: {
          user: {
            isMachine: false,
          },
          notificationPreference: {
            linkUsageSummary: true,
            linkUsageWeeklyReport: true, // Weekly summary of link usage and performance
            linkUsageLimitAlerts: true, // Notifications when approaching or exceeding usage limits
            domainVerificationAlerts: true, // Domain verification status changes and issues
            domainExpirationAlerts: true, // Domain expiration warnings and renewal reminders
            sslCertificateAlerts: true, // SSL certificate issues and expiration warnings

            // Transaction Notifications
            newTransactionAlerts: true, // Notifications for new transactions posted to accounts
            largeTransactionAlerts: true, // Alerts for transactions exceeding defined thresholds
            recurringTransactionAlerts: true, // Notifications about recurring transaction patterns
            failedTransactionAlerts: true, // Alerts for failed or declined transactions
            transactionDisputeUpdates: true, // Updates on transaction dispute status and resolution

            // Payment Notifications
            upcomingPaymentReminders: true, // Reminders for upcoming scheduled payments
            missedPaymentAlerts: true, // Alerts for missed or late payments
            paymentConfirmations: true, // Confirmations of successful payments
            paymentMethodAlerts: true, // Payment method expiration and update notifications
            recurringPaymentUpdates: true, // Changes to recurring payment schedules

            // Balance Notifications
            lowBalanceAlerts: true, // Alerts when balance falls below threshold
            negativeBalanceAlerts: true, // Notifications for negative balance events
            overdraftWarnings: true, // Warnings about potential overdraft situations
            significantBalanceChanges: true, // Alerts for unusual or large balance changes
            availableCreditUpdates: true, // Updates on available credit and limits

            // Budget Notifications
            budgetLimitAlerts: true, // Alerts when approaching budget limits
            budgetOverrunNotifications: true, // Notifications when exceeding budget
            monthlyBudgetSummaries: true, // Monthly budget performance reports
            categoryBudgetAlerts: true, // Category-specific budget notifications
            budgetRecommendations: true, // AI-powered budget optimization suggestions

            // Security Notifications
            loginAttemptAlerts: true, // Notifications of login attempts
            deviceAuthorizationAlerts: true, // New device authorization requests
            securitySettingChanges: true, // Changes to security settings and preferences
            fraudAlerts: true, // Potential fraud or suspicious activity
            twoFactorAuthEvents: true, // 2FA-related notifications and backup codes

            // Bank Connection Notifications
            connectionStatusChanges: true, // Bank connection status updates
            syncFailureAlerts: true, // Failed synchronization notifications
            reconnectionReminders: true, // Reminders to reconnect bank accounts
            newAccountDiscovery: true, // Detection of new bank accounts
            credentialUpdateReminders: true, // Reminders to update bank credentials

            // Document Notifications
            newDocumentAlerts: true, // Notifications for new document uploads
            documentSharingEvents: true, // Document sharing and access updates
            signatureRequests: true, // Requests for document signatures
            documentExpirationAlerts: true, // Document expiration warnings
            complianceDocumentAlerts: true, // Required compliance document notifications

            // Invoice Notifications
            newInvoiceAlerts: true, // Notifications for new invoice creation
            invoicePaymentReceipts: true, // Confirmations of invoice payments
            overdueInvoiceReminders: true, // Reminders for overdue invoices
            invoiceDisputeAlerts: true, // Notifications about invoice disputes
            recurringInvoiceUpdates: true, // Updates to recurring invoice schedules

            // Contract Notifications
            contractDraftAlerts: true, // Notifications for new contract drafts
            contractSignatureAlerts: true, // Contract signature status updates
            contractRenewalReminders: true, // Contract renewal deadline reminders
            contractAmendmentAlerts: true, // Notifications of contract amendments
            contractTemplateUpdates: true, // Updates to contract templates

            // Report Notifications
            monthlyReportAvailability: true, // Monthly financial report availability
            customReportCompletion: true, // Custom report generation notifications
            analyticsInsightAlerts: true, // AI-generated analytics insights
            taxReportAvailability: true, // Tax-related report notifications
            auditReportAlerts: true, // Audit report availability and findings

            // Customer Notifications
            newCustomerRegistrations: true, // New customer registration alerts
            customerProfileChanges: true, // Customer profile update notifications
            customerPaymentUpdates: true, // Customer payment method changes
            customerSupportTickets: true, // Customer support ticket updates
            customerActivityAlerts: true, // Unusual customer activity notifications

            // Category Management Notifications
            newCategoryAlerts: true, // New category creation notifications
            categoryRuleUpdates: true, // Changes to categorization rules
            uncategorizedTransactions: true, // Alerts for uncategorized transactions
            categoryMergeNotifications: true, // Category consolidation updates
            autoCategorizeUpdates: true, // Auto-categorization system changes

            // Tax Document Notifications
            taxFormAvailability: true, // New tax form availability alerts
            taxFilingDeadlines: true, // Tax filing deadline reminders
            taxPaymentReminders: true, // Tax payment due date notifications
            annualTaxSummaries: true, // Year-end tax summary availability
            taxPreparationUpdates: true, // Tax preparation status updates
          },
        },
        orderBy: {
          createdAt: "asc",
        },
        take: 10, // Only send to the first 10 users
      },
      sentEmails: true,
    },
    orderBy: [
      {
        usageLastChecked: "asc",
      },
      {
        createdAt: "asc",
      },
    ],
    take: limit,
  });

  // if no workspaces left, meaning cron is complete
  if (workspaces.length === 0) {
    return;
  }

  // Reset billing cycles for workspaces that have
  // adjustedBillingCycleStart that matches today's date
  const billingReset = workspaces.filter(
    ({ billingCycleStart }) =>
      getAdjustedBillingCycleStart(billingCycleStart as number) ===
      new Date().getDate(),
  );

  // Reset usage and alert emails for the billingReset workspaces
  // also send 30-day summary email
  await Promise.allSettled(
    billingReset.map(async (workspace) => {
      const { plan, usage, usageLimit } = workspace;

      /*
        We only reset clicks usage if it's not over usageLimit by:
        - 4x for free plan (4K clicks)
        - 2x for all other plans
      */

      const resetUsage =
        plan === "free" ? usage <= usageLimit * 4 : usage <= usageLimit * 2;

      await prisma.project.update({
        where: {
          id: workspace.id,
        },
        data: {
          ...(resetUsage && {
            usage: 0,
          }),
          linksUsage: 0,
          salesUsage: 0,
          aiUsage: 0,
          sentEmails: {
            deleteMany: {
              type: {
                in: [
                  "firstUsageLimitEmail",
                  "secondUsageLimitEmail",
                  "firstLinksLimitEmail",
                  "secondLinksLimitEmail",
                ],
              },
            },
          },
        },
      });

      /* Only send the 30-day summary email if:
         - the workspace has at least 1 link click
         - the workspace was created more than 30 days ago
       */
      if (
        workspace.usage > 0 &&
        workspace.createdAt.getTime() <
          new Date().getTime() - 30 * 24 * 60 * 60 * 1000
      ) {
        const topLinks = await getAnalytics({
          workspaceId: workspace.id,
          event: "clicks",
          groupBy: "top_links",
          interval: "30d",
          root: false,
        }).then(async (data) => {
          const topFive = data.slice(0, 5);
          const topFiveLinkIds = topFive.map(({ link }) => link);

          const links = await prisma.link.findMany({
            where: {
              projectId: workspace.id,
              id: {
                in: topFiveLinkIds,
              },
            },
            select: {
              id: true,
              domain: true,
              key: true,
            },
          });

          const allLinks = links.map((link) => ({
            id: link.id,
            shortLink: linkConstructor({
              domain: link.domain,
              key: link.key,
              pretty: true,
            }),
          }));

          return topFive.map((d) => ({
            link: allLinks.find((l) => l.id === d.link)?.shortLink || "",
            clicks: d.clicks,
          }));
        });

        const emails = workspace.users.map(
          (user) => user.user.email,
        ) as string[];

        await Promise.allSettled(
          emails.map((email) => {
            limiter.schedule(() =>
              sendEmail({
                subject: `Your 30-day ${platform.company} summary for ${workspace.name}`,
                email,
                react: ClicksSummary({
                  email,
                  appName: platform.company as string,
                  appDomain: platform.domain as string,
                  workspaceName: workspace.name,
                  workspaceSlug: workspace.slug,
                  totalClicks: workspace.usage,
                  createdLinks: workspace.linksUsage,
                  topLinks,
                }),
              }),
            );
          }),
        );
      }
    }),
  );

  // Update usageLastChecked for workspaces
  await prisma.project.updateMany({
    where: {
      id: {
        in: workspaces.map(({ id }) => id),
      },
    },
    data: {
      usageLastChecked: new Date(),
    },
  });

  // Get all workspaces that have exceeded usage
  const exceedingUsage = workspaces.filter(
    ({ usage, usageLimit }) => usage > usageLimit,
  );

  // Send email to notify overages
  await Promise.allSettled(
    exceedingUsage.map(async (workspace) => {
      const { slug, plan, usage, usageLimit, users, sentEmails } = workspace;
      const emails = users.map((user) => user.user.email) as string[];

      await log({
        message: `*${slug}* is over their *${capitalize(
          plan,
        )} Plan* usage limit. Usage: ${usage}, Limit: ${usageLimit}, Email: ${emails.join(
          ", ",
        )}`,
        type: plan === "free" ? "cron" : "alerts",
        mention: plan !== "free",
      });
      const sentFirstUsageLimitEmail = sentEmails.some(
        (email) => email.type === "firstUsageLimitEmail",
      );
      if (!sentFirstUsageLimitEmail) {
        sendLimitEmail({
          emails,
          workspace: workspace as unknown as WorkspaceProps,
          type: "firstUsageLimitEmail",
        });
      } else {
        const sentSecondUsageLimitEmail = sentEmails.some(
          (email) => email.type === "secondUsageLimitEmail",
        );
        if (!sentSecondUsageLimitEmail) {
          const daysSinceFirstEmail = Math.floor(
            (new Date().getTime() -
              new Date(sentEmails[0].createdAt).getTime()) /
              (1000 * 3600 * 24),
          );
          if (daysSinceFirstEmail >= 3) {
            sendLimitEmail({
              emails,
              workspace: workspace as unknown as WorkspaceProps,
              type: "secondUsageLimitEmail",
            });
          }
        }
      }
    }),
  );

  return await qstash.publishJSON({
    url: `${APP_DOMAIN_WITH_NGROK}/api/cron/usage`,
    method: "POST",
    body: {},
  });
};
