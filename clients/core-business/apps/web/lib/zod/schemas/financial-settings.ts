import { z } from "zod";

// Enums from schema.prisma
export const MatchingStrategyEnum = z.enum(["EXACT", "FUZZY", "AMOUNT_ONLY"]);
export const SyncFrequencyEnum = z.enum(["REALTIME", "DAILY", "WEEKLY"]);
export const CurrencyEnum = z.enum(["USD", "GBP", "EUR"]);

/**
 * Schema for financial settings
 */
export const FinancialSettingsSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),

  // Currency Settings
  defaultCurrency: CurrencyEnum.default("USD"),
  enableMultiCurrency: z.boolean().default(true),
  supportedCurrencies: z.string().nullable(), // JSON array of supported currencies

  // Bank Connection Settings (Plaid)
  plaidEnabled: z.boolean().default(true),
  gocardlessEnabled: z.boolean().default(true),
  allowManualBankEntry: z.boolean().default(true),
  requireBankVerification: z.boolean().default(true),

  // Stripe Settings
  stripeEnabled: z.boolean().default(true),
  stripeCardPaymentsCapability: z.string().nullable(), // active, inactive, pending
  stripeTransfersCapability: z.string().nullable(), // active, inactive, pending

  // Payment Provider Settings
  activePaymentProviders: z.string().nullable(), // JSON array of active payment providers
  providerConfigs: z.string().nullable(), // JSON object storing configs for other providers

  // Transaction Settings
  autoCategorizeTxn: z.boolean().default(true),
  minTxnAmount: z.number().nullable(),
  maxTxnAmount: z.number().nullable(),

  // Notification Settings
  notifyLargeTransactions: z.boolean().default(true),
  largeTransactionThreshold: z.number().nullable(),
  notifyFailedSync: z.boolean().default(true),
  notifyLowBalance: z.boolean().default(false),
  lowBalanceThreshold: z.number().nullable(),

  // Reconciliation Settings
  autoReconciliation: z.boolean().default(true),
  reconciliationWindow: z.number().default(3), // Days to look back for matching transactions
  matchingStrategy: MatchingStrategyEnum.default("EXACT"),

  // Sync Settings
  syncFrequency: SyncFrequencyEnum.default("DAILY"),
  lastSuccessfulSync: z.date().nullable(),
  syncStatus: z.string().nullable(), // SUCCESS, FAILED, IN_PROGRESS

  // Timestamps
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date(),
});

/**
 * Schema for creating financial settings
 */
export const CreateFinancialSettingsSchema = FinancialSettingsSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial({
  userId: true,
});

/**
 * Schema for updating financial settings
 */
export const UpdateFinancialSettingsSchema = FinancialSettingsSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
}).partial();

export type FinancialSettings = z.infer<typeof FinancialSettingsSchema>;
export type CreateFinancialSettings = z.infer<typeof CreateFinancialSettingsSchema>;
export type UpdateFinancialSettings = z.infer<typeof UpdateFinancialSettingsSchema>;
