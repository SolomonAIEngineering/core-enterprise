import { DubApiError } from "@/lib/api/errors";
import { NextResponse } from "next/server";
import { UpdateFinancialSettingsSchema } from "@/lib/zod/schemas/financial-settings";
import { prisma } from "@dub/prisma";
import { withSession } from "@/lib/auth";

/**
 * GET /api/financial-settings/[id]
 *
 * Retrieves a specific financial settings by ID.
 */
export const GET = withSession(async ({ params, session }) => {
    try {
        const settings = await prisma.financialSettings.findUnique({
            where: {
                id: params.id,
                userId: session.user.id, // Ensure user can only access their own settings
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
            throw new DubApiError({
                code: "not_found",
                message: "Financial settings not found",
            });
        }

        return NextResponse.json(settings);
    } catch (error) {
        console.error("Error in GET /api/financial-settings/[id]:", error);
        if (error instanceof DubApiError) throw error;

        throw new DubApiError({
            code: "internal_server_error",
            message: "Error retrieving financial settings",
        });
    }
});

/**
 * PATCH /api/financial-settings/[id]
 *
 * Updates a specific financial settings by ID.
 */
export const PATCH = withSession(async ({ req, params, session }) => {
    try {
        const data = await UpdateFinancialSettingsSchema.parseAsync(await req.json());

        // Verify the settings exist and belong to the user
        const existingSettings = await prisma.financialSettings.findUnique({
            where: {
                id: params.id,
                userId: session.user.id,
            },
        });

        if (!existingSettings) {
            throw new DubApiError({
                code: "not_found",
                message: "Financial settings not found",
            });
        }

        const settings = await prisma.financialSettings.update({
            where: {
                id: params.id,
                userId: session.user.id,
            },
            data: {
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
        console.error("Error in PATCH /api/financial-settings/[id]:", error);
        if (error instanceof DubApiError) throw error;

        throw new DubApiError({
            code: "internal_server_error",
            message: "Error updating financial settings",
        });
    }
});

/**
 * DELETE /api/financial-settings/[id]
 *
 * Deletes a specific financial settings by ID.
 */
export const DELETE = withSession(async ({ params, session }) => {
    try {
        // Verify the settings exist and belong to the user
        const existingSettings = await prisma.financialSettings.findUnique({
            where: {
                id: params.id,
                userId: session.user.id,
            },
        });

        if (!existingSettings) {
            throw new DubApiError({
                code: "not_found",
                message: "Financial settings not found",
            });
        }

        await prisma.financialSettings.delete({
            where: {
                id: params.id,
                userId: session.user.id,
            },
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("Error in DELETE /api/financial-settings/[id]:", error);
        if (error instanceof DubApiError) throw error;

        throw new DubApiError({
            code: "internal_server_error",
            message: "Error deleting financial settings",
        });
    }
});

export const PUT = PATCH;
