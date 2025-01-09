import { DubApiError } from "@/lib/api/errors";
import { NextResponse } from "next/server";
import { UpdateFinancialSettingsSchema } from "@/lib/zod/schemas/financial-settings";
import { prisma } from "@dub/prisma";
import { withSession } from "@/lib/auth";

/**
 * GET /api/financial-settings
 *
 * Retrieves the financial settings for the current user.
 */
export const GET = withSession(async ({ session }) => {
  try {
    const settings = await prisma.financialSettings.findUnique({
      where: {
        userId: session.user.id,
      },
      select: {
        // Currency Settings
        defaultCurrency: true,
        enableMultiCurrency: true,
        supportedCurrencies: true,

        // Bank Connection Settings
        plaidEnabled: true,
        gocardlessEnabled: true,
        allowManualBankEntry: true,
        requireBankVerification: true,

        // Stripe Settings
        stripeEnabled: true,
        stripeCardPaymentsCapability: true,
        stripeTransfersCapability: true,

        // Payment Provider Settings
        activePaymentProviders: true,
        providerConfigs: true,

        // Transaction Settings
        autoCategorizeTxn: true,
        minTxnAmount: true,
        maxTxnAmount: true,

        // Notification Settings
        notifyLargeTransactions: true,
        largeTransactionThreshold: true,
        notifyFailedSync: true,
        notifyLowBalance: true,
        lowBalanceThreshold: true,

        // Reconciliation Settings
        autoReconciliation: true,
        reconciliationWindow: true,
        matchingStrategy: true,

        // Sync Settings
        syncFrequency: true,
        lastSuccessfulSync: true,
        syncStatus: true,
      },
    });

    if (!settings) {
      // Create default settings if none exist
      return NextResponse.json({
        defaultCurrency: "USD",
        enableMultiCurrency: false,
        supportedCurrencies: null,
        plaidEnabled: false,
        gocardlessEnabled: false,
        allowManualBankEntry: true,
        requireBankVerification: false,
        stripeEnabled: false,
        stripeCardPaymentsCapability: null,
        stripeTransfersCapability: null,
        activePaymentProviders: null,
        providerConfigs: null,
        autoCategorizeTxn: true,
        minTxnAmount: null,
        maxTxnAmount: null,
        notifyLargeTransactions: true,
        largeTransactionThreshold: null,
        notifyFailedSync: true,
        notifyLowBalance: false,
        lowBalanceThreshold: null,
        autoReconciliation: true,
        reconciliationWindow: 3,
        matchingStrategy: "EXACT",
        syncFrequency: "DAILY",
        lastSuccessfulSync: null,
        syncStatus: null,
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error in GET /api/financial-settings:", error);
    if (error instanceof DubApiError) throw error;

    throw new DubApiError({
      code: "internal_server_error",
      message: "Error retrieving financial settings",
    });
  }
});

/**
 * PATCH /api/financial-settings
 *
 * Updates the financial settings for the current user.
 */
export const PATCH = withSession(async ({ req, session }) => {
  try {
    const data = await UpdateFinancialSettingsSchema.parseAsync(await req.json());

    const settings = await prisma.financialSettings.upsert({
      where: {
        userId: session.user.id,
      },
      create: {
        userId: session.user.id,
        // Currency Settings
        defaultCurrency: data.defaultCurrency || "USD",
        enableMultiCurrency: data.enableMultiCurrency || false,
        supportedCurrencies: data.supportedCurrencies,

        // Bank Connection Settings
        plaidEnabled: data.plaidEnabled || false,
        gocardlessEnabled: data.gocardlessEnabled || false,
        allowManualBankEntry: data.allowManualBankEntry ?? true,
        requireBankVerification: data.requireBankVerification || false,

        // Stripe Settings
        stripeEnabled: data.stripeEnabled || false,
        stripeCardPaymentsCapability: data.stripeCardPaymentsCapability,
        stripeTransfersCapability: data.stripeTransfersCapability,

        // Payment Provider Settings
        activePaymentProviders: data.activePaymentProviders,
        providerConfigs: data.providerConfigs,

        // Transaction Settings
        autoCategorizeTxn: data.autoCategorizeTxn ?? true,
        minTxnAmount: data.minTxnAmount,
        maxTxnAmount: data.maxTxnAmount,

        // Notification Settings
        notifyLargeTransactions: data.notifyLargeTransactions ?? true,
        largeTransactionThreshold: data.largeTransactionThreshold,
        notifyFailedSync: data.notifyFailedSync ?? true,
        notifyLowBalance: data.notifyLowBalance || false,
        lowBalanceThreshold: data.lowBalanceThreshold,

        // Reconciliation Settings
        autoReconciliation: data.autoReconciliation ?? true,
        reconciliationWindow: data.reconciliationWindow || 3,
        matchingStrategy: data.matchingStrategy || "EXACT",

        // Sync Settings
        syncFrequency: data.syncFrequency || "DAILY",
        syncStatus: data.syncStatus,
      },
      update: {
        // Only update fields that are provided in the request
        ...(data.defaultCurrency && { defaultCurrency: data.defaultCurrency }),
        ...(data.enableMultiCurrency !== undefined && { enableMultiCurrency: data.enableMultiCurrency }),
        ...(data.supportedCurrencies && { supportedCurrencies: data.supportedCurrencies }),
        ...(data.plaidEnabled !== undefined && { plaidEnabled: data.plaidEnabled }),
        ...(data.gocardlessEnabled !== undefined && { gocardlessEnabled: data.gocardlessEnabled }),
        ...(data.allowManualBankEntry !== undefined && { allowManualBankEntry: data.allowManualBankEntry }),
        ...(data.requireBankVerification !== undefined && { requireBankVerification: data.requireBankVerification }),
        ...(data.stripeEnabled !== undefined && { stripeEnabled: data.stripeEnabled }),
        ...(data.stripeCardPaymentsCapability && { stripeCardPaymentsCapability: data.stripeCardPaymentsCapability }),
        ...(data.stripeTransfersCapability && { stripeTransfersCapability: data.stripeTransfersCapability }),
        ...(data.activePaymentProviders && { activePaymentProviders: data.activePaymentProviders }),
        ...(data.providerConfigs && { providerConfigs: data.providerConfigs }),
        ...(data.autoCategorizeTxn !== undefined && { autoCategorizeTxn: data.autoCategorizeTxn }),
        ...(data.minTxnAmount && { minTxnAmount: data.minTxnAmount }),
        ...(data.maxTxnAmount && { maxTxnAmount: data.maxTxnAmount }),
        ...(data.notifyLargeTransactions !== undefined && { notifyLargeTransactions: data.notifyLargeTransactions }),
        ...(data.largeTransactionThreshold && { largeTransactionThreshold: data.largeTransactionThreshold }),
        ...(data.notifyFailedSync !== undefined && { notifyFailedSync: data.notifyFailedSync }),
        ...(data.notifyLowBalance !== undefined && { notifyLowBalance: data.notifyLowBalance }),
        ...(data.lowBalanceThreshold && { lowBalanceThreshold: data.lowBalanceThreshold }),
        ...(data.autoReconciliation !== undefined && { autoReconciliation: data.autoReconciliation }),
        ...(data.reconciliationWindow && { reconciliationWindow: data.reconciliationWindow }),
        ...(data.matchingStrategy && { matchingStrategy: data.matchingStrategy }),
        ...(data.syncFrequency && { syncFrequency: data.syncFrequency }),
        ...(data.syncStatus && { syncStatus: data.syncStatus }),
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error in PATCH /api/financial-settings:", error);
    if (error instanceof DubApiError) throw error;

    throw new DubApiError({
      code: "internal_server_error",
      message: "Error updating financial settings",
    });
  }
});

export const PUT = PATCH;

/**
 * POST /api/financial-settings
 *
 * Creates new financial settings for the current user.
 */
export const POST = withSession(async ({ req, session }) => {
  try {
    const data = await UpdateFinancialSettingsSchema.parseAsync(await req.json());

    // Check if settings already exist
    const existingSettings = await prisma.financialSettings.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (existingSettings) {
      throw new DubApiError({
        code: "bad_request",
        message: "Financial settings already exist for this user",
      });
    }

    const settings = await prisma.financialSettings.create({
      data: {
        userId: session.user.id,
        // Currency Settings
        defaultCurrency: data.defaultCurrency || "USD",
        enableMultiCurrency: data.enableMultiCurrency || false,
        supportedCurrencies: data.supportedCurrencies,

        // Bank Connection Settings
        plaidEnabled: data.plaidEnabled || false,
        gocardlessEnabled: data.gocardlessEnabled || false,
        allowManualBankEntry: data.allowManualBankEntry ?? true,
        requireBankVerification: data.requireBankVerification || false,

        // Stripe Settings
        stripeEnabled: data.stripeEnabled || false,
        stripeCardPaymentsCapability: data.stripeCardPaymentsCapability,
        stripeTransfersCapability: data.stripeTransfersCapability,

        // Payment Provider Settings
        activePaymentProviders: data.activePaymentProviders,
        providerConfigs: data.providerConfigs,

        // Transaction Settings
        autoCategorizeTxn: data.autoCategorizeTxn ?? true,
        minTxnAmount: data.minTxnAmount,
        maxTxnAmount: data.maxTxnAmount,

        // Notification Settings
        notifyLargeTransactions: data.notifyLargeTransactions ?? true,
        largeTransactionThreshold: data.largeTransactionThreshold,
        notifyFailedSync: data.notifyFailedSync ?? true,
        notifyLowBalance: data.notifyLowBalance || false,
        lowBalanceThreshold: data.lowBalanceThreshold,

        // Reconciliation Settings
        autoReconciliation: data.autoReconciliation ?? true,
        reconciliationWindow: data.reconciliationWindow || 3,
        matchingStrategy: data.matchingStrategy || "EXACT",

        // Sync Settings
        syncFrequency: data.syncFrequency || "DAILY",
        syncStatus: data.syncStatus,
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error in POST /api/financial-settings:", error);
    if (error instanceof DubApiError) throw error;

    throw new DubApiError({
      code: "internal_server_error",
      message: "Error creating financial settings",
    });
  }
});
