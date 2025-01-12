"use client";

import { useFinancialSettings } from "@/lib/swr/use-financial-setting";
import UpdateBankConnections from "@/ui/financial-settings/update-bank-connections";
import UpdateCurrency from "@/ui/financial-settings/update-currency";
import UpdateNotifications from "@/ui/financial-settings/update-notifications";
import UpdatePaymentProviders from "@/ui/financial-settings/update-payment-providers";
import UpdateReconciliation from "@/ui/financial-settings/update-reconciliation";
import UpdateSync from "@/ui/financial-settings/update-sync";
import UpdateTransactionSettings from "@/ui/financial-settings/update-transaction-settings";
import LayoutLoader from "@/ui/layout/layout-loader";

export default function FinancialSettingsPageClient() {
  const { settings, loading } = useFinancialSettings();

  if (loading) return <LayoutLoader />;

  // Parse JSON strings into arrays/objects
  const supportedCurrencies = settings?.supportedCurrencies
    ? JSON.parse(settings.supportedCurrencies)
    : null;
  const activePaymentProviders = settings?.activePaymentProviders
    ? JSON.parse(settings.activePaymentProviders)
    : null;
  const providerConfigs = settings?.providerConfigs
    ? JSON.parse(settings.providerConfigs)
    : null;

  return (
    <div className="flex flex-col space-y-6">
      <UpdateCurrency
        defaultCurrency={settings?.defaultCurrency || "USD"}
        enableMultiCurrency={settings?.enableMultiCurrency || false}
        supportedCurrencies={supportedCurrencies}
      />
      <UpdateBankConnections
        plaidEnabled={settings?.plaidEnabled || false}
        gocardlessEnabled={settings?.gocardlessEnabled || false}
        allowManualBankEntry={settings?.allowManualBankEntry || false}
        requireBankVerification={settings?.requireBankVerification || false}
      />
      <UpdatePaymentProviders
        stripeEnabled={settings?.stripeEnabled || false}
        stripeCardPaymentsCapability={
          settings?.stripeCardPaymentsCapability || null
        }
        stripeTransfersCapability={settings?.stripeTransfersCapability || null}
        activePaymentProviders={activePaymentProviders}
        providerConfigs={providerConfigs}
      />
      <UpdateTransactionSettings
        autoCategorizeTxn={settings?.autoCategorizeTxn || false}
        minTxnAmount={settings?.minTxnAmount || 0}
        maxTxnAmount={settings?.maxTxnAmount || 0}
      />
      <UpdateNotifications
        notifyLargeTransactions={settings?.notifyLargeTransactions || false}
        largeTransactionThreshold={settings?.largeTransactionThreshold || 0}
        notifyFailedSync={settings?.notifyFailedSync || false}
        notifyLowBalance={settings?.notifyLowBalance || false}
        lowBalanceThreshold={settings?.lowBalanceThreshold || 0}
      />
      <UpdateReconciliation
        autoReconciliation={settings?.autoReconciliation || false}
        reconciliationWindow={settings?.reconciliationWindow || 0}
        matchingStrategy={settings?.matchingStrategy || "EXACT"}
      />
      <UpdateSync
        syncFrequency={settings?.syncFrequency || "DAILY"}
        lastSuccessfulSync={settings?.lastSuccessfulSync || null}
        syncStatus={settings?.syncStatus || "SUCCESS"}
      />
    </div>
  );
}
