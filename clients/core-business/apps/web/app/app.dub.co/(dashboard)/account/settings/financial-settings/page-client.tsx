"use client";

import UpdateBankConnections from "@/ui/financial-settings/update-bank-connections";
import UpdateCurrency from "@/ui/financial-settings/update-currency";
import UpdateNotifications from "@/ui/financial-settings/update-notifications";
import UpdatePaymentProviders from "@/ui/financial-settings/update-payment-providers";
import UpdateReconciliation from "@/ui/financial-settings/update-reconciliation";
import UpdateSync from "@/ui/financial-settings/update-sync";
import UpdateTransactionSettings from "@/ui/financial-settings/update-transaction-settings";
import { useFinancialSettings } from "@/lib/swr/use-financial-setting";

export default function FinancialSettingsPageClient() {
  const { settings } = useFinancialSettings();

  if (!settings) return null;

  // Parse JSON strings into arrays/objects
  const supportedCurrencies = settings.supportedCurrencies ? JSON.parse(settings.supportedCurrencies) : null;
  const activePaymentProviders = settings.activePaymentProviders ? JSON.parse(settings.activePaymentProviders) : null;
  const providerConfigs = settings.providerConfigs ? JSON.parse(settings.providerConfigs) : null;

  return (
    <div className="flex flex-col space-y-6">
      <UpdateCurrency
        defaultCurrency={settings.defaultCurrency}
        enableMultiCurrency={settings.enableMultiCurrency}
        supportedCurrencies={supportedCurrencies}
      />
      <UpdateBankConnections
        plaidEnabled={settings.plaidEnabled}
        gocardlessEnabled={settings.gocardlessEnabled}
        allowManualBankEntry={settings.allowManualBankEntry}
        requireBankVerification={settings.requireBankVerification}
      />
      <UpdatePaymentProviders
        stripeEnabled={settings.stripeEnabled}
        stripeCardPaymentsCapability={settings.stripeCardPaymentsCapability}
        stripeTransfersCapability={settings.stripeTransfersCapability}
        activePaymentProviders={activePaymentProviders}
        providerConfigs={providerConfigs}
      />
      <UpdateTransactionSettings
        autoCategorizeTxn={settings.autoCategorizeTxn}
        minTxnAmount={settings.minTxnAmount}
        maxTxnAmount={settings.maxTxnAmount}
      />
      <UpdateNotifications
        notifyLargeTransactions={settings.notifyLargeTransactions}
        largeTransactionThreshold={settings.largeTransactionThreshold}
        notifyFailedSync={settings.notifyFailedSync}
        notifyLowBalance={settings.notifyLowBalance}
        lowBalanceThreshold={settings.lowBalanceThreshold}
      />
      <UpdateReconciliation
        autoReconciliation={settings.autoReconciliation}
        reconciliationWindow={settings.reconciliationWindow}
        matchingStrategy={settings.matchingStrategy}
      />
      <UpdateSync
        syncFrequency={settings.syncFrequency}
        lastSuccessfulSync={settings.lastSuccessfulSync}
        syncStatus={settings.syncStatus}
      />
    </div>
  );
}
