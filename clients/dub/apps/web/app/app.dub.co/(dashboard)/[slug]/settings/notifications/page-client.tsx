"use client";

import {
  SimpleTooltipContent,
  Switch,
  Tooltip,
  useOptimisticUpdate,
} from "@dub/ui";
import { Globe, Note, Receipt2, Users } from "@dub/ui/icons";
import { Card, Tabs, TabsContent, TabsList, TabsTrigger } from "@dub/ui/ui";
import {
  BadgeCent,
  Banknote,
  Bell,
  BellDot,
  BringToFront,
  Cable,
  Calendar,
  ChartBar,
  ChartBarStacked,
  ChevronDown,
  CircleX,
  DollarSign,
  FileText,
  FolderSync,
  HandCoins,
  KeyRound,
  KeySquare,
  LayoutList,
  Lock,
  Logs,
  Megaphone,
  Minus,
  PieChart,
  RedoDot,
  RefreshCcw,
  RefreshCcwDot,
  Save,
  ScanLine,
  Shield,
  ShoppingBag,
  SlashIcon,
  Speech,
  Tag,
  WalletCards,
} from "lucide-react";

import { updateNotificationPreference } from "@/lib/actions/update-notification-preference";
import useWorkspace from "@/lib/swr/use-workspace";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

type PreferenceType =
  // Platform Usage Notifications
  | "linkUsageSummary"
  | "domainConfigurationUpdates"
  | "linkUsageWeeklyReport"
  | "linkUsageLimitAlerts"
  | "domainVerificationAlerts"
  | "domainExpirationAlerts"
  | "sslCertificateAlerts"
  // Transaction Notifications
  | "newTransactionAlerts"
  | "largeTransactionAlerts"
  | "recurringTransactionAlerts"
  | "failedTransactionAlerts"
  | "transactionDisputeUpdates"
  // Payment Notifications
  | "upcomingPaymentReminders"
  | "missedPaymentAlerts"
  | "paymentConfirmations"
  | "paymentMethodAlerts"
  | "recurringPaymentUpdates"
  // Balance Notifications
  | "lowBalanceAlerts"
  | "negativeBalanceAlerts"
  | "overdraftWarnings"
  | "significantBalanceChanges"
  | "availableCreditUpdates"
  // Budget Notifications
  | "budgetLimitAlerts"
  | "budgetOverrunNotifications"
  | "monthlyBudgetSummaries"
  | "categoryBudgetAlerts"
  | "budgetRecommendations"
  // Security Notifications
  | "loginAttemptAlerts"
  | "deviceAuthorizationAlerts"
  | "securitySettingChanges"
  | "fraudAlerts"
  | "twoFactorAuthEvents"
  // Bank Connection Notifications
  | "connectionStatusChanges"
  | "syncFailureAlerts"
  | "reconnectionReminders"
  | "newAccountDiscovery"
  | "credentialUpdateReminders"
  // Document Notifications
  | "newDocumentAlerts"
  | "documentSharingEvents"
  | "signatureRequests"
  | "documentExpirationAlerts"
  | "complianceDocumentAlerts"
  // Invoice Notifications
  | "newInvoiceAlerts"
  | "invoicePaymentReceipts"
  | "overdueInvoiceReminders"
  | "invoiceDisputeAlerts"
  | "recurringInvoiceUpdates"
  // Contract Notifications
  | "contractDraftAlerts"
  | "contractSignatureAlerts"
  | "contractRenewalReminders"
  | "contractAmendmentAlerts"
  | "contractTemplateUpdates"
  // Report Notifications
  | "monthlyReportAvailability"
  | "customReportCompletion"
  | "analyticsInsightAlerts"
  | "taxReportAvailability"
  | "auditReportAlerts"
  // Customer Notifications
  | "newCustomerRegistrations"
  | "customerProfileChanges"
  | "customerPaymentUpdates"
  | "customerSupportTickets"
  | "customerActivityAlerts"
  // Category Management Notifications
  | "newCategoryAlerts"
  | "categoryRuleUpdates"
  | "uncategorizedTransactions"
  | "categoryMergeNotifications"
  | "autoCategorizeUpdates"
  // Tax Document Notifications
  | "taxFormAvailability"
  | "taxFilingDeadlines"
  | "taxPaymentReminders"
  | "annualTaxSummaries"
  | "taxPreparationUpdates";

type Preferences = Record<PreferenceType, boolean>;

const notifications: {
  type: PreferenceType;
  icon: React.ElementType;
  title: string;
  description: string;
}[] = [
  // {
  //   type: "linkUsageWeeklyReport",
  //   icon: Hyperlink,
  //   title: "Weekly Usage Report",
  //   description: "Detailed weekly analytics showing link performance metrics, click-through rates, peak usage times, and engagement patterns. Includes comparative analysis with previous weeks and actionable insights.",
  // },
  // {
  //   type: "linkUsageLimitAlerts",
  //   icon: Hyperlink,
  //   title: "Usage Limit Alerts",
  //   description: "Proactive notifications when you're approaching (80%) or have exceeded your plan's usage limits. Includes detailed usage statistics, upgrade recommendations, and impact on your link operations.",
  // },
  // {
  //   type: "domainVerificationAlerts",
  //   icon: Globe,
  //   title: "Domain Verification Alerts",
  //   description: "Critical updates about your domain verification status, including successful verifications, pending requirements, and any issues that need attention. Includes step-by-step guidance for resolving verification problems.",
  // },
  // {
  //   type: "domainExpirationAlerts",
  //   icon: Globe,
  //   title: "Domain Expiration Alerts",
  //   description: "Timely reminders about upcoming domain expirations, starting 60 days before expiry. Includes renewal instructions, pricing details, and warnings about potential service interruptions if not renewed.",
  // },
  {
    type: "sslCertificateAlerts",
    icon: Globe,
    title: "SSL Certificate Alerts",
    description:
      "Important notifications about your SSL certificates, including expiration warnings, renewal status, and any security issues. Includes automated renewal confirmations and manual intervention requirements.",
  },
  {
    type: "newTransactionAlerts",
    icon: Logs,
    title: "New Transaction Alerts",
    description:
      "Real-time notifications for new transactions, including transaction amount, merchant details, category assignment, and initial fraud screening results. Customize thresholds for notification triggers.",
  },
  {
    type: "largeTransactionAlerts",
    icon: LayoutList,
    title: "Large Transaction Alerts",
    description:
      "Instant alerts when transactions exceed your defined thresholds. Includes transaction details, merchant information, historical context with this merchant, and option to verify or flag suspicious activity.",
  },
  {
    type: "recurringTransactionAlerts",
    icon: RefreshCcwDot,
    title: "Recurring Transaction Alerts",
    description:
      "Smart notifications about recurring payment patterns, including changes in amount, schedule modifications, and upcoming renewal alerts. Helps track subscriptions and regular payments.",
  },
  {
    type: "failedTransactionAlerts",
    icon: CircleX,
    title: "Failed Transaction Alerts",
    description:
      "Immediate notifications when transactions are declined or fail, including reason for failure, suggested corrective actions, and potential impact on scheduled payments or services.",
  },
  {
    type: "transactionDisputeUpdates",
    icon: Speech,
    title: "Transaction Dispute Updates",
    description:
      "Comprehensive updates on dispute status, including case numbers, required documentation, resolution timeline, and outcome notifications. Includes guidance for providing additional information when needed.",
  },
  {
    type: "upcomingPaymentReminders",
    icon: Calendar,
    title: "Upcoming Payment Reminders",
    description:
      "Advance notifications for scheduled payments, including payment amount, due date, and available payment methods. Option to adjust payment date or method before processing.",
  },
  {
    type: "missedPaymentAlerts",
    icon: BadgeCent,
    title: "Missed Payment Alerts",
    description:
      "Urgent notifications about missed or late payments, including grace period information, late fee details, and options to make immediate payment. Includes impact on services and account standing.",
  },
  {
    type: "paymentConfirmations",
    icon: Banknote,
    title: "Payment Confirmations",
    description:
      "Detailed confirmations of successful payments, including transaction ID, payment method used, processing time, and updated account balance. Includes digital receipt and transaction reference.",
  },
  {
    type: "paymentMethodAlerts",
    icon: HandCoins,
    title: "Payment Method Alerts",
    description:
      "Important updates about your payment methods, including expiration warnings, failed automatic updates, and security alerts. Includes guidance for updating or adding new payment methods.",
  },
  {
    type: "recurringPaymentUpdates",
    icon: DollarSign,
    title: "Recurring Payment Updates",
    description:
      "Notifications about changes to recurring payment schedules, including amount adjustments, frequency changes, and processing dates. Option to review and modify recurring payment settings.",
  },
  {
    type: "lowBalanceAlerts",
    icon: ChevronDown,
    title: "Low Balance Alerts",
    description:
      "Proactive warnings when your balance falls below specified thresholds. Includes current balance, pending transactions, and suggestions for preventing overdraft or service interruptions.",
  },
  {
    type: "negativeBalanceAlerts",
    icon: Minus,
    title: "Negative Balance Alerts",
    description:
      "Critical notifications when your account balance becomes negative, including overdraft fees, impact on scheduled payments, and immediate actions required to resolve the situation.",
  },
  {
    type: "overdraftWarnings",
    icon: BringToFront,
    title: "Overdraft Warnings",
    description:
      "Predictive alerts when upcoming transactions or scheduled payments might cause an overdraft. Includes balance projections, pending transactions, and options to prevent overdraft fees.",
  },
  {
    type: "significantBalanceChanges",
    icon: RedoDot,
    title: "Significant Balance Changes",
    description:
      "Alerts for unusual or large changes in your balance, including detailed transaction history, category analysis, and comparison with typical spending patterns. Helps identify potential fraud.",
  },
  {
    type: "availableCreditUpdates",
    icon: WalletCards,
    title: "Available Credit Updates",
    description:
      "Regular updates about your available credit, including credit utilization, recent limit changes, and impact on your credit score. Includes recommendations for optimal credit management.",
  },
  {
    type: "budgetLimitAlerts",
    icon: Save,
    title: "Budget Limit Alerts",
    description:
      "Timely notifications when approaching category-specific or overall budget limits. Includes spending analysis, remaining budget, and projected end-of-period spending based on current patterns.",
  },
  {
    type: "budgetOverrunNotifications",
    icon: BellDot,
    title: "Budget Overrun Notifications",
    description:
      "Detailed alerts when exceeding budget limits, including overspend amount, affected categories, and impact on overall financial goals. Includes suggestions for budget adjustments.",
  },
  {
    type: "monthlyBudgetSummaries",
    icon: ScanLine,
    title: "Monthly Budget Summaries",
    description:
      "Comprehensive monthly review of budget performance across all categories, including variance analysis, trend identification, and personalized insights for better budget management.",
  },
  {
    type: "categoryBudgetAlerts",
    icon: ChartBarStacked,
    title: "Category Budget Alerts",
    description:
      "Category-specific notifications about spending patterns, budget utilization, and unusual activity. Includes historical comparison and recommendations for category budget adjustments.",
  },
  {
    type: "budgetRecommendations",
    icon: ShoppingBag,
    title: "Budget Recommendations",
    description:
      "AI-powered suggestions for optimizing your budget based on spending patterns, income changes, and financial goals. Includes specific actions for improving financial health.",
  },
  {
    type: "loginAttemptAlerts",
    icon: Lock,
    title: "Login Attempt Alerts",
    description:
      "Real-time security notifications for all login attempts to your account, including location, device details, and IP address. Get instant alerts for unsuccessful attempts, suspicious locations, or unusual login patterns to protect your account.",
  },
  {
    type: "deviceAuthorizationAlerts",
    icon: KeyRound,
    title: "Device Authorization Alerts",
    description:
      "Comprehensive notifications when new devices request access to your account. Includes device fingerprint, location data, and browser information. Quickly approve or deny access requests and manage trusted devices list.",
  },
  {
    type: "securitySettingChanges",
    icon: KeySquare,
    title: "Security Setting Changes",
    description:
      "Immediate alerts when security-related settings are modified, including password changes, 2FA updates, or security question modifications. Track who made the changes and when, with option to revert suspicious modifications.",
  },
  {
    type: "fraudAlerts",
    icon: Megaphone,
    title: "Fraud Alerts",
    description:
      "Advanced fraud detection notifications using AI-powered analysis to identify suspicious patterns. Get immediate alerts about potential security breaches, unauthorized access attempts, and unusual account activity with recommended security actions.",
  },
  {
    type: "twoFactorAuthEvents",
    icon: Shield,
    title: "Two-Factor Authentication Events",
    description:
      "Detailed notifications about 2FA-related activities, including new device verifications, backup code usage, and authentication method changes. Includes security recommendations and backup code management options.",
  },
  {
    type: "connectionStatusChanges",
    icon: Cable,
    title: "Connection Status Changes",
    description:
      "Real-time updates about your bank connection status, including successful syncs, connection interruptions, and API status changes. Receive proactive notifications about maintenance windows and potential service impacts.",
  },
  {
    type: "syncFailureAlerts",
    icon: RefreshCcw,
    title: "Sync Failure Alerts",
    description:
      "Detailed notifications when data synchronization fails, including specific error information, affected accounts, and troubleshooting steps. Get guidance on resolving sync issues and maintaining data accuracy.",
  },
  {
    type: "reconnectionReminders",
    icon: FolderSync,
    title: "Reconnection Reminders",
    description:
      "Smart reminders to reconnect bank accounts when connections become inactive or require re-authentication. Includes connection health status, last successful sync time, and step-by-step reconnection instructions.",
  },
  {
    type: "newAccountDiscovery",
    icon: Bell,
    title: "New Account Discovery",
    description:
      "Automated notifications when new bank accounts are detected in your connected institutions. Review account details, verify ownership, and choose whether to include them in your financial tracking.",
  },
  {
    type: "credentialUpdateReminders",
    icon: Bell,
    title: "Credential Update Reminders",
    description:
      "Timely reminders to update your bank credentials when they're approaching expiration or require refresh. Includes security best practices and guidance for maintaining secure, uninterrupted account access.",
  },
  {
    type: "newDocumentAlerts",
    icon: FileText,
    title: "New Document Alerts",
    description:
      "Instant notifications when new documents are uploaded or generated in your account. Review document type, size, and security classification, with quick options to view, share, or take required actions.",
  },
  {
    type: "documentSharingEvents",
    icon: Bell,
    title: "Document Sharing Events",
    description:
      "Comprehensive tracking of document sharing activities, including who accessed shared documents, download events, and permission changes. Maintain security with detailed audit trails and access control updates.",
  },
  {
    type: "signatureRequests",
    icon: Bell,
    title: "Signature Requests",
    description:
      "Priority notifications for document signature requests, including deadline tracking, multi-party signature status, and reminder schedules. Manage signature workflows with real-time updates on all parties' actions.",
  },
  {
    type: "documentExpirationAlerts",
    icon: Bell,
    title: "Document Expiration Alerts",
    description:
      "Proactive notifications about approaching document expiration dates, including renewal requirements, compliance impacts, and necessary actions. Stay ahead of deadlines with customizable reminder schedules.",
  },
  {
    type: "complianceDocumentAlerts",
    icon: Bell,
    title: "Compliance Document Alerts",
    description:
      "Critical notifications about required compliance documents, including submission deadlines, regulatory updates, and verification status. Track document completeness and maintain regulatory compliance effortlessly.",
  },
  {
    type: "newInvoiceAlerts",
    icon: Bell,
    title: "New Invoice Alerts",
    description:
      "Instant notifications when new invoices are created, including amount, due date, and payment terms. Review invoice details, supporting documents, and payment options directly from the notification.",
  },
  {
    type: "invoicePaymentReceipts",
    icon: Bell,
    title: "Invoice Payment Receipts",
    description:
      "Detailed payment confirmation notifications including transaction details, payment method, processing time, and updated invoice status. Access digital receipts and payment history with ease.",
  },
  {
    type: "overdueInvoiceReminders",
    icon: Bell,
    title: "Overdue Invoice Reminders",
    description:
      "Automated reminders for overdue invoices with escalating urgency based on days past due. Includes payment options, late fee information, and impact on account standing with easy payment initiation.",
  },
  {
    type: "invoiceDisputeAlerts",
    icon: Bell,
    title: "Invoice Dispute Alerts",
    description:
      "Real-time notifications about invoice disputes, including dispute reason, supporting documentation, and resolution timeline. Track dispute status and participate in resolution processes efficiently.",
  },
  {
    type: "recurringInvoiceUpdates",
    icon: Bell,
    title: "Recurring Invoice Updates",
    description:
      "Notifications about changes to recurring invoice schedules, including amount adjustments, frequency modifications, and next generation dates. Manage recurring billing cycles with advance notifications.",
  },
  {
    type: "contractDraftAlerts",
    icon: Bell,
    title: "Contract Draft Alerts",
    description:
      "Immediate notifications when new contract drafts are created or modified, including version tracking and change summaries. Review and collaborate on contract drafts with stakeholder input tracking.",
  },
  {
    type: "contractSignatureAlerts",
    icon: Bell,
    title: "Contract Signature Alerts",
    description:
      "Real-time updates on contract signature status, including multi-party signature tracking, timestamp verification, and completion confirmation. Monitor the entire signature workflow with detailed audit trails.",
  },
  {
    type: "contractRenewalReminders",
    icon: Bell,
    title: "Contract Renewal Reminders",
    description:
      "Strategic notifications about upcoming contract renewals, including key terms, pricing changes, and renewal options. Plan ahead with customizable reminder schedules and renewal process guidance.",
  },
  {
    type: "contractAmendmentAlerts",
    icon: Bell,
    title: "Contract Amendment Alerts",
    description:
      "Detailed notifications about contract amendments, including change tracking, approval requirements, and version control. Stay informed about all modifications with comprehensive amendment history.",
  },
  {
    type: "contractTemplateUpdates",
    icon: Bell,
    title: "Contract Template Updates",
    description:
      "Notifications when contract templates are updated, including change summaries, affected contracts, and implementation timelines. Maintain consistency across contracts with template version control.",
  },
  {
    type: "monthlyReportAvailability",
    icon: PieChart,
    title: "Monthly Report Availability",
    description:
      "Timely notifications when monthly financial reports are ready, including performance summaries, trend analysis, and key metrics. Access comprehensive financial insights with historical comparisons.",
  },
  {
    type: "customReportCompletion",
    icon: PieChart,
    title: "Custom Report Completion",
    description:
      "Alerts when your custom-generated reports are ready, including data coverage, analysis parameters, and export options. Access tailored insights with customizable report delivery preferences.",
  },
  {
    type: "analyticsInsightAlerts",
    icon: PieChart,
    title: "Analytics Insight Alerts",
    description:
      "AI-powered notifications highlighting significant trends, anomalies, and opportunities in your data. Receive actionable insights with detailed analysis and recommended actions.",
  },
  {
    type: "taxReportAvailability",
    icon: PieChart,
    title: "Tax Report Availability",
    description:
      "Priority notifications when tax-related reports are ready, including filing requirements, deadline tracking, and document completeness. Stay compliant with organized tax documentation.",
  },
  {
    type: "auditReportAlerts",
    icon: PieChart,
    title: "Audit Report Alerts",
    description:
      "Critical notifications about audit report findings, including compliance status, risk assessments, and required actions. Track audit progress and maintain compliance with detailed reporting.",
  },
  {
    type: "newCustomerRegistrations",
    icon: Users,
    title: "New Customer Registrations",
    description:
      "Real-time alerts when new customers register, including profile details, verification status, and onboarding requirements. Streamline customer onboarding with automated workflow triggers.",
  },
  {
    type: "customerProfileChanges",
    icon: Bell,
    title: "Customer Profile Changes",
    description:
      "Detailed notifications about customer profile updates, including changed fields, verification requirements, and approval status. Maintain accurate customer records with change tracking.",
  },
  {
    type: "customerPaymentUpdates",
    icon: Bell,
    title: "Customer Payment Updates",
    description:
      "Immediate alerts about customer payment method changes, including validation status, auto-pay impacts, and security verifications. Ensure uninterrupted billing with proactive payment management.",
  },
  {
    type: "customerSupportTickets",
    icon: Bell,
    title: "Customer Support Tickets",
    description:
      "Real-time notifications about customer support interactions, including ticket priority, response times, and resolution status. Maintain high service levels with comprehensive ticket tracking.",
  },
  {
    type: "customerActivityAlerts",
    icon: Bell,
    title: "Customer Activity Alerts",
    description:
      "Smart notifications about unusual or significant customer activities, including behavior patterns, engagement metrics, and risk indicators. Proactively manage customer relationships with AI-driven insights.",
  },
  {
    type: "newCategoryAlerts",
    icon: Tag,
    title: "New Category Alerts",
    description:
      "Notifications when new transaction categories are created, including category rules, auto-categorization settings, and reporting impacts. Maintain organized financial tracking with category management.",
  },
  {
    type: "categoryRuleUpdates",
    icon: Tag,
    title: "Category Rule Updates",
    description:
      "Detailed alerts about changes to categorization rules, including affected transactions, rule logic updates, and automation settings. Optimize transaction categorization with rule refinement tracking.",
  },
  {
    type: "uncategorizedTransactions",
    icon: Bell,
    title: "Uncategorized Transactions",
    description:
      "Smart notifications about transactions requiring categorization, including transaction details, suggested categories, and bulk categorization options. Maintain accurate financial reporting with complete categorization.",
  },
  {
    type: "categoryMergeNotifications",
    icon: Tag,
    title: "Category Merge Notifications",
    description:
      "Comprehensive updates about category consolidation activities, including affected transactions, reporting impacts, and historical data adjustments. Streamline category management with organized merging.",
  },
  {
    type: "autoCategorizeUpdates",
    icon: Tag,
    title: "Auto-Categorize Updates",
    description:
      "Notifications about improvements and changes to the auto-categorization system, including accuracy metrics, rule refinements, and AI model updates. Optimize automated categorization with continuous learning.",
  },
  {
    type: "taxFormAvailability",
    icon: Receipt2,
    title: "Tax Form Availability",
    description:
      "Priority alerts when new tax forms are available, including form types, filing requirements, and submission deadlines. Stay organized with comprehensive tax document management.",
  },
  {
    type: "taxFilingDeadlines",
    icon: Bell,
    title: "Tax Filing Deadlines",
    description:
      "Strategic reminders about approaching tax filing deadlines, including required forms, payment obligations, and extension options. Maintain compliance with customizable deadline tracking.",
  },
  {
    type: "taxPaymentReminders",
    icon: Bell,
    title: "Tax Payment Reminders",
    description:
      "Timely notifications about tax payment due dates, including payment amounts, available methods, and late payment implications. Manage tax obligations with organized payment scheduling.",
  },
  {
    type: "annualTaxSummaries",
    icon: PieChart,
    title: "Annual Tax Summaries",
    description:
      "Comprehensive notifications when annual tax summaries are ready, including income analysis, deduction tracking, and tax liability projections. Plan effectively with detailed tax insights.",
  },
  {
    type: "taxPreparationUpdates",
    icon: PieChart,
    title: "Tax Preparation Updates",
    description:
      "Regular updates about tax preparation progress, including document completeness, review status, and required actions. Stay informed throughout the tax preparation process with milestone tracking.",
  },
];

const categories = [
  {
    title: "Platform Usage",
    icon: ChartBar,
    description:
      "Configure notifications for core platform features including link analytics, domain management, and usage metrics. Stay informed about domain verification status, SSL certificates, and usage limits. Get detailed insights into your link performance and receive timely alerts about domain-related issues.",
    types: [
      "linkUsageSummary",
      "domainConfigurationUpdates",
      "linkUsageWeeklyReport",
      "linkUsageLimitAlerts",
      "domainVerificationAlerts",
      "domainExpirationAlerts",
      "sslCertificateAlerts",
    ],
  },
  {
    title: "Financial Activity",
    icon: PieChart,
    description:
      "Get real-time updates on all financial transactions. Monitor large transactions, recurring payments, and receive instant alerts for failed or disputed transactions. Stay informed about payment processing status and any unusual transaction patterns that require attention.",
    types: [
      "newTransactionAlerts",
      "largeTransactionAlerts",
      "recurringTransactionAlerts",
      "failedTransactionAlerts",
      "transactionDisputeUpdates",
      "upcomingPaymentReminders",
      "missedPaymentAlerts",
      "paymentConfirmations",
      "paymentMethodAlerts",
      "recurringPaymentUpdates",
    ],
  },
  {
    title: "Balance & Budget",
    icon: Banknote,
    description:
      "Stay on top of your finances with comprehensive balance monitoring and budget tracking. Receive alerts for low balances, overdrafts, and get AI-powered budget recommendations. Track spending patterns and receive proactive notifications about potential budget overruns or unusual spending activities.",
    types: [
      "lowBalanceAlerts",
      "negativeBalanceAlerts",
      "overdraftWarnings",
      "significantBalanceChanges",
      "availableCreditUpdates",
      "budgetLimitAlerts",
      "budgetOverrunNotifications",
      "monthlyBudgetSummaries",
      "categoryBudgetAlerts",
      "budgetRecommendations",
    ],
  },
  {
    title: "Security & Access",
    icon: Shield,
    description:
      "Enhance your account security with comprehensive alerts for login attempts, device authorizations, and potential security threats. Get immediate notifications for any suspicious activity, unauthorized access attempts, or changes to security settings. Stay protected with real-time security monitoring and two-factor authentication updates.",
    types: [
      "loginAttemptAlerts",
      "deviceAuthorizationAlerts",
      "securitySettingChanges",
      "fraudAlerts",
      "twoFactorAuthEvents",
    ],
  },
  {
    title: "Documents & Contracts",
    icon: Note,
    description:
      "Never miss important document updates with our comprehensive document management notifications. Track contract statuses, signature requests, and document expiration dates. Stay compliant with automated document alerts and receive timely notifications about contract renewals, amendments, and template updates. Keep your document workflow organized and efficient.",
    types: [
      "newDocumentAlerts",
      "documentSharingEvents",
      "signatureRequests",
      "documentExpirationAlerts",
      "complianceDocumentAlerts",
      "contractDraftAlerts",
      "contractSignatureAlerts",
      "contractRenewalReminders",
      "contractAmendmentAlerts",
      "contractTemplateUpdates",
    ],
  },
  {
    title: "Reports & Analytics",
    icon: SlashIcon,
    description:
      "Access detailed insights with customized reports and analytics notifications. Get alerts when new reports are available, including monthly summaries, custom report completions, and AI-generated business insights. Stay informed about key metrics, trends, and performance indicators through comprehensive analytical updates.",
    types: [
      "monthlyReportAvailability",
      "customReportCompletion",
      "analyticsInsightAlerts",
      "taxReportAvailability",
      "auditReportAlerts",
    ],
  },
  {
    title: "Customer Management",
    icon: Users,
    description:
      "Keep track of all customer interactions and activities in real-time. Monitor new registrations, profile changes, and support ticket updates. Receive notifications about customer payment updates, unusual activity patterns, and important customer service events. Stay connected with your customer base through comprehensive activity monitoring.",
    types: [
      "newCustomerRegistrations",
      "customerProfileChanges",
      "customerPaymentUpdates",
      "customerSupportTickets",
      "customerActivityAlerts",
    ],
  },
  {
    title: "Categories & Organization",
    icon: Tag,
    description:
      "Maintain organized transactions with our smart categorization system. Get alerts for uncategorized transactions, updates to categorization rules, and automated category suggestions. Stay informed about category merges, rule changes, and improvements to the auto-categorization system for better financial organization.",
    types: [
      "newCategoryAlerts",
      "categoryRuleUpdates",
      "uncategorizedTransactions",
      "categoryMergeNotifications",
      "autoCategorizeUpdates",
    ],
  },
  {
    title: "Tax Related",
    icon: Receipt2,
    description:
      "Stay compliant with tax obligations through comprehensive tax-related notifications. Receive timely reminders for tax filing deadlines, payment due dates, and notifications when new tax forms are available. Get updates about tax preparation progress, annual summaries, and important tax document availability to ensure smooth tax management.",
    types: [
      "taxFormAvailability",
      "taxFilingDeadlines",
      "taxPaymentReminders",
      "annualTaxSummaries",
      "taxPreparationUpdates",
    ],
  },
];

export default function NotificationsSettingsPageClient() {
  const { id: workspaceId } = useWorkspace();
  const { executeAsync } = useAction(updateNotificationPreference);

  const {
    data: preferences,
    isLoading,
    update,
  } = useOptimisticUpdate<Preferences>(
    `/api/workspaces/${workspaceId}/notification-preferences`,
    {
      loading: "Updating notification preference...",
      success: "",
      error: "Failed to update notification preference.",
    },
  );

  const handleUpdate = async ({
    type,
    value,
    currentPreferences,
  }: {
    type: string;
    value: boolean;
    currentPreferences: Preferences;
  }) => {
    if (!workspaceId) return currentPreferences;

    await executeAsync({
      workspaceId,
      type: type as PreferenceType,
      value,
    });

    const notificationTitle = notifications.find((n) => n.type === type)?.title;
    toast.success(
      `${notificationTitle} notifications ${value ? "enabled" : "disabled"}.`,
    );

    return {
      ...currentPreferences,
      [type]: value,
    };
  };

  const renderNotificationList = (types: string[]) => (
    <div className="grid grid-cols-1 gap-3">
      {types.map((type) => {
        const notification = notifications.find((n) => n.type === type);
        if (!notification) return null;

        const { icon: Icon, title, description } = notification;
        return (
          <div
            key={type}
            className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-5"
          >
            <div className="flex min-w-0 items-center gap-4">
              <div className="hidden rounded-full border border-gray-200 sm:block">
                <div className="rounded-full border border-white bg-gradient-to-t from-gray-100 p-1 md:p-3">
                  <Icon className="size-5" />
                </div>
              </div>
              <div className="overflow-hidden">
                <div className="flex items-center gap-1.5 sm:gap-2.5">
                  <div className="truncate text-sm font-medium">{title}</div>
                </div>
                <div className="mt-1 flex items-center gap-1 text-xs">
                  <span className="whitespace-pre-wrap text-gray-500">
                    {description}
                  </span>
                </div>
              </div>
            </div>
            <Switch
              checked={preferences?.[type] ?? false}
              disabled={isLoading}
              fn={(checked: boolean) => {
                if (!preferences) return;

                update(
                  () =>
                    handleUpdate({
                      type,
                      value: checked,
                      currentPreferences: preferences,
                    }),
                  {
                    ...preferences,
                    [type]: checked,
                  },
                );
              }}
            />
          </div>
        );
      })}
    </div>
  );

  return (
    <div>
      <div className="max-w-screen-sm pb-8">
        <h2 className="text-xl font-semibold tracking-tight text-black">
          Workspace Notifications
        </h2>
        <p className="mt-3 text-sm text-gray-500">
          Adjust your personal notification preferences and choose which updates
          you want to receive. These settings will only be applied to your
          personal account.
        </p>
      </div>
      <Tabs defaultValue={categories[0].title} className="flex w-full gap-8">
        <Card className="h-fit w-fit p-[2%]">
          <TabsList className="flex h-fit w-64 flex-col space-y-1 bg-transparent p-0">
            {categories.map((category) => (
              <TabsTrigger
                key={category.title}
                value={category.title}
                className="w-full justify-start px-4 py-2 text-left font-medium"
              >
                <div className="flex items-center gap-2">
                  <div className="rounded-full border border-white bg-gradient-to-t from-gray-100 p-1 md:p-3">
                    <category.icon className="h-4 w-4" />
                  </div>
                  {category.title}
                  <Tooltip
                    content={
                      <SimpleTooltipContent
                        title={category.description}
                        cta="Learn more."
                        href={""}
                      />
                    }
                  />
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </Card>

        <Card className="w-fit border-0 p-[2%] shadow-none">
          <div className="flex-1">
            {categories.map((category) => (
              <TabsContent
                key={category.title}
                value={category.title}
                className="mt-0 border-0"
              >
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {category.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      {category.description}
                    </p>
                  </div>
                  {renderNotificationList(category.types)}
                </div>
              </TabsContent>
            ))}
          </div>
        </Card>
      </Tabs>
    </div>
  );
}
