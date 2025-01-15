import { withWorkspace } from "@/lib/auth";
import { prisma } from "@dub/prisma";
import { NextResponse } from "next/server";

// GET /api/workspaces/[idOrSlug]/notification-preferences – get notification preferences for a workspace for the current user
export const GET = withWorkspace(async ({ workspace, session }) => {
  const response = await prisma.notificationPreference.findFirstOrThrow({
    select: {
      domainConfigurationUpdates: true,
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
    where: {
      projectUser: {
        userId: session.user.id,
        projectId: workspace.id,
      },
    },
  });

  return NextResponse.json(response);
});
