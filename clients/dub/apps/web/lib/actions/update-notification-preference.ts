"use server";

import { prisma } from "@dub/prisma";
import z from "../zod";
import { authActionClient } from "./safe-action";

const schema = z.object({
  workspaceId: z.string(),
  type: z.enum([
    // Platform Usage Notifications
    "linkUsageSummary",
    "domainConfigurationUpdates",
    "linkUsageWeeklyReport",
    "linkUsageLimitAlerts",
    "domainVerificationAlerts",
    "domainExpirationAlerts",
    "sslCertificateAlerts",

    // Transaction Notifications
    "newTransactionAlerts",
    "largeTransactionAlerts",
    "recurringTransactionAlerts",
    "failedTransactionAlerts",
    "transactionDisputeUpdates",

    // Payment Notifications
    "upcomingPaymentReminders",
    "missedPaymentAlerts",
    "paymentConfirmations",
    "paymentMethodAlerts",
    "recurringPaymentUpdates",

    // Balance Notifications
    "lowBalanceAlerts",
    "negativeBalanceAlerts",
    "overdraftWarnings",
    "significantBalanceChanges",
    "availableCreditUpdates",

    // Budget Notifications
    "budgetLimitAlerts",
    "budgetOverrunNotifications",
    "monthlyBudgetSummaries",
    "categoryBudgetAlerts",
    "budgetRecommendations",

    // Security Notifications
    "loginAttemptAlerts",
    "deviceAuthorizationAlerts",
    "securitySettingChanges",
    "fraudAlerts",
    "twoFactorAuthEvents",

    // Bank Connection Notifications
    "connectionStatusChanges",
    "syncFailureAlerts",
    "reconnectionReminders",
    "newAccountDiscovery",
    "credentialUpdateReminders",

    // Document Notifications
    "newDocumentAlerts",
    "documentSharingEvents",
    "signatureRequests",
    "documentExpirationAlerts",
    "complianceDocumentAlerts",

    // Invoice Notifications
    "newInvoiceAlerts",
    "invoicePaymentReceipts",
    "overdueInvoiceReminders",
    "invoiceDisputeAlerts",
    "recurringInvoiceUpdates",

    // Contract Notifications
    "contractDraftAlerts",
    "contractSignatureAlerts",
    "contractRenewalReminders",
    "contractAmendmentAlerts",
    "contractTemplateUpdates",

    // Report Notifications
    "monthlyReportAvailability",
    "customReportCompletion",
    "analyticsInsightAlerts",
    "taxReportAvailability",
    "auditReportAlerts",

    // Customer Notifications
    "newCustomerRegistrations",
    "customerProfileChanges",
    "customerPaymentUpdates",
    "customerSupportTickets",
    "customerActivityAlerts",

    // Category Management Notifications
    "newCategoryAlerts",
    "categoryRuleUpdates",
    "uncategorizedTransactions",
    "categoryMergeNotifications",
    "autoCategorizeUpdates",

    // Tax Document Notifications
    "taxFormAvailability",
    "taxFilingDeadlines",
    "taxPaymentReminders",
    "annualTaxSummaries",
    "taxPreparationUpdates",
  ]),
  value: z.boolean(),
});

// Update the notification preference for a user in a workspace
export const updateNotificationPreference = authActionClient
  .schema(schema)
  .action(async ({ ctx, parsedInput }) => {
    const { user, workspace } = ctx;
    const { type, value } = parsedInput;

    await prisma.projectUsers.update({
      where: {
        userId_projectId: {
          userId: user.id,
          projectId: workspace.id,
        },
      },
      data: {
        notificationPreference: {
          update: {
            [type]: value,
          },
        },
      },
    });

    return { ok: true };
  });
