import { Switch } from "@dub/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const BANK_FEATURES = [
  {
    id: "plaidEnabled",
    title: "Plaid Integration",
    description: "Connect your bank accounts via Plaid",
  },
  {
    id: "gocardlessEnabled",
    title: "GoCardless Integration",
    description: "Connect your bank accounts via GoCardless",
  },
  {
    id: "allowManualBankEntry",
    title: "Manual Bank Entry",
    description: "Allow manual entry of bank account details",
  },
  {
    id: "requireBankVerification",
    title: "Bank Verification",
    description: "Require verification for new bank accounts",
  },
] as const;

export default function UpdateBankConnections({
  plaidEnabled: initialPlaidEnabled,
  gocardlessEnabled: initialGocardlessEnabled,
  allowManualBankEntry: initialAllowManualEntry,
  requireBankVerification: initialRequireVerification,
}: {
  plaidEnabled: boolean;
  gocardlessEnabled: boolean;
  allowManualBankEntry: boolean;
  requireBankVerification: boolean;
}) {
  const router = useRouter();
  const [updating, setUpdating] = useState(false);
  const [features, setFeatures] = useState({
    plaidEnabled: initialPlaidEnabled,
    gocardlessEnabled: initialGocardlessEnabled,
    allowManualBankEntry: initialAllowManualEntry,
    requireBankVerification: initialRequireVerification,
  });

  const handleUpdateFeature = async (
    feature:
      | "plaidEnabled"
      | "gocardlessEnabled"
      | "allowManualBankEntry"
      | "requireBankVerification",
    value: boolean,
  ) => {
    // Optimistically update the UI
    setFeatures((prev) => ({ ...prev, [feature]: value }));
    setUpdating(true);

    try {
      const response = await fetch("/api/financial-settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [feature]: value,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        // Revert the change on error
        setFeatures((prev) => ({ ...prev, [feature]: !value }));
        throw new Error(error.message);
      }

      toast.success("Bank connection settings updated successfully!");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Error updating bank connection settings",
      );
    } finally {
      setUpdating(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="rounded-lg border border-gray-200 bg-white"
    >
      <div className="flex flex-col space-y-3 p-5 sm:p-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium text-gray-700">
              Bank Connections
            </h2>
            <p className="text-sm text-gray-500">
              Configure how bank accounts can be connected and managed
            </p>
          </div>
        </div>

        <div className="w-full max-w-md space-y-6">
          {BANK_FEATURES.map((feature) => (
            <div
              key={feature.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-all hover:bg-gray-50"
            >
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
              <Switch
                fn={() => {
                  const currentValue = features[feature.id];
                  handleUpdateFeature(feature.id, !currentValue);
                }}
                checked={features[feature.id]}
                disabled={updating}
              />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between space-x-4 rounded-b-lg border border-gray-200 bg-gray-50 p-3 sm:px-10">
          <p className="text-sm text-gray-500">
            These settings control how bank accounts can be connected and
            managed in your system.
          </p>
        </div>
      </div>
    </form>
  );
}
