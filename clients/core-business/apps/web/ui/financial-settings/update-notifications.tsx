import { Combobox, type ComboboxOption, Switch } from "@dub/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const THRESHOLD_OPTIONS: ComboboxOption<{ description: string }>[] = [
  { label: "$100", value: "100", meta: { description: "Low threshold" } },
  { label: "$500", value: "500", meta: { description: "Medium threshold" } },
  {
    label: "$1,000",
    value: "1000",
    meta: { description: "Standard threshold" },
  },
  { label: "$5,000", value: "5000", meta: { description: "High threshold" } },
  {
    label: "$10,000",
    value: "10000",
    meta: { description: "Very high threshold" },
  },
];

type NotificationFeature = {
  id: "notifyLargeTransactions" | "notifyFailedSync" | "notifyLowBalance";
  title: string;
  description: string;
  hasThreshold?: boolean;
  thresholdField?: "largeTransactionThreshold" | "lowBalanceThreshold";
};

const NOTIFICATION_FEATURES: NotificationFeature[] = [
  {
    id: "notifyLargeTransactions",
    title: "Large Transaction Alerts",
    description: "Get notified when large transactions occur",
    hasThreshold: true,
    thresholdField: "largeTransactionThreshold",
  },
  {
    id: "notifyFailedSync",
    title: "Failed Sync Notifications",
    description: "Get notified when bank sync fails",
    hasThreshold: false,
  },
  {
    id: "notifyLowBalance",
    title: "Low Balance Alerts",
    description: "Get notified when account balance is low",
    hasThreshold: true,
    thresholdField: "lowBalanceThreshold",
  },
];

export default function UpdateNotifications({
  notifyLargeTransactions: initialNotifyLargeTransactions,
  largeTransactionThreshold: initialLargeTransactionThreshold,
  notifyFailedSync: initialNotifyFailedSync,
  notifyLowBalance: initialNotifyLowBalance,
  lowBalanceThreshold: initialLowBalanceThreshold,
}: {
  notifyLargeTransactions: boolean;
  largeTransactionThreshold: number | null;
  notifyFailedSync: boolean;
  notifyLowBalance: boolean;
  lowBalanceThreshold: number | null;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [features, setFeatures] = useState({
    notifyLargeTransactions: initialNotifyLargeTransactions,
    notifyFailedSync: initialNotifyFailedSync,
    notifyLowBalance: initialNotifyLowBalance,
  });
  const [thresholds, setThresholds] = useState({
    largeTransactionThreshold:
      THRESHOLD_OPTIONS.find(
        (opt) => opt.value === String(initialLargeTransactionThreshold),
      ) || null,
    lowBalanceThreshold:
      THRESHOLD_OPTIONS.find(
        (opt) => opt.value === String(initialLowBalanceThreshold),
      ) || null,
  });

  const handleUpdateFeature = async (
    feature: keyof typeof features,
    value: boolean,
    thresholdField?: string,
  ) => {
    // Optimistically update the UI
    setFeatures((prev) => ({ ...prev, [feature]: value }));
    setSaving(true);

    try {
      const response = await fetch("/api/financial-settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [feature]: value,
          // If disabling a feature with threshold, clear the threshold
          ...(thresholdField && !value ? { [thresholdField]: null } : {}),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        // Revert the change on error
        setFeatures((prev) => ({ ...prev, [feature]: !value }));
        throw new Error(error.message);
      }

      toast.success("Notification settings updated successfully!");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Error updating notification settings",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateThreshold = async (
    field: keyof typeof thresholds,
    option: ComboboxOption | null,
  ) => {
    if (!option) return;

    setThresholds((prev) => ({ ...prev, [field]: option }));
    setSaving(true);

    try {
      const response = await fetch("/api/financial-settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [field]: Number(option.value),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      toast.success("Threshold updated successfully!");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error updating threshold",
      );
    } finally {
      setSaving(false);
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
              Notification Settings
            </h2>
            <p className="text-sm text-gray-500">
              Configure when and how you receive notifications
            </p>
          </div>
        </div>

        <div className="w-full max-w-md space-y-6">
          {NOTIFICATION_FEATURES.map((feature) => (
            <div key={feature.id} className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-all hover:bg-gray-50">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </div>
                <Switch
                  fn={() =>
                    handleUpdateFeature(
                      feature.id,
                      !features[feature.id],
                      feature.thresholdField,
                    )
                  }
                  checked={features[feature.id]}
                  disabled={saving}
                />
              </div>

              {feature.hasThreshold &&
                features[feature.id] &&
                feature.thresholdField && (
                  <div className="ml-4">
                    <label className="text-sm font-medium text-gray-700">
                      Threshold Amount
                    </label>
                    <p className="mb-2 text-sm text-gray-500">
                      Set the threshold for notifications
                    </p>
                    <Combobox
                      options={THRESHOLD_OPTIONS}
                      selected={thresholds[feature.thresholdField]}
                      setSelected={(option) =>
                        handleUpdateThreshold(
                          feature.thresholdField as keyof typeof thresholds,
                          option,
                        )
                      }
                      placeholder="Select threshold amount..."
                      searchPlaceholder="Search amounts..."
                      emptyState="No matching amounts found"
                      optionRight={(option) => (
                        <span className="text-sm text-gray-500">
                          {option.meta.description}
                        </span>
                      )}
                    />
                  </div>
                )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between space-x-4 rounded-b-lg border border-gray-200 bg-gray-50 p-3 sm:px-10">
          <p className="text-sm text-gray-500">
            These settings control when you receive notifications about your
            financial activity.
          </p>
        </div>
      </div>
    </form>
  );
}
