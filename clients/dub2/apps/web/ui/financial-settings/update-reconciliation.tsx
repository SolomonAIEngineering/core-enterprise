import { Button, Combobox, type ComboboxOption, Switch } from "@dub/ui";
import type { MatchingStrategy } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const WINDOW_OPTIONS: ComboboxOption<{ description: string }>[] = [
  { label: "1 Day", value: "1", meta: { description: "Look back one day" } },
  {
    label: "3 Days",
    value: "3",
    meta: { description: "Standard window (Recommended)" },
  },
  { label: "7 Days", value: "7", meta: { description: "Extended window" } },
  { label: "14 Days", value: "14", meta: { description: "Wide window" } },
  { label: "30 Days", value: "30", meta: { description: "Maximum window" } },
];

const STRATEGY_OPTIONS: ComboboxOption<{ description: string }>[] = [
  {
    label: "Exact Match",
    value: "EXACT",
    meta: { description: "Match transactions with exact amounts and dates" },
  },
  {
    label: "Fuzzy Match",
    value: "FUZZY",
    meta: { description: "Match transactions with similar amounts and dates" },
  },
  {
    label: "Amount Only",
    value: "AMOUNT_ONLY",
    meta: { description: "Match transactions based on amount only" },
  },
];

export default function UpdateReconciliation({
  autoReconciliation: initialAutoReconciliation,
  reconciliationWindow: initialWindow,
  matchingStrategy: initialStrategy,
}: {
  autoReconciliation: boolean;
  reconciliationWindow: number;
  matchingStrategy: MatchingStrategy;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [autoReconciliation, setAutoReconciliation] = useState(
    initialAutoReconciliation,
  );
  const [selectedWindow, setSelectedWindow] = useState<ComboboxOption | null>(
    WINDOW_OPTIONS.find((opt) => opt.value === String(initialWindow)) || null,
  );
  const [selectedStrategy, setSelectedStrategy] =
    useState<ComboboxOption | null>(
      STRATEGY_OPTIONS.find((opt) => opt.value === initialStrategy) || null,
    );

  const handleUpdateSettings = async () => {
    if (
      autoReconciliation === initialAutoReconciliation &&
      Number(selectedWindow?.value) === initialWindow &&
      selectedStrategy?.value === initialStrategy
    ) {
      return;
    }

    setSaving(true);
    try {
      const response = await fetch("/api/financial-settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          autoReconciliation,
          reconciliationWindow: Number(selectedWindow?.value),
          matchingStrategy: selectedStrategy?.value,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      toast.success("Reconciliation settings updated successfully!");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Error updating reconciliation settings",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await handleUpdateSettings();
      }}
      className="rounded-lg border border-gray-200 bg-white"
    >
      <div className="flex flex-col space-y-3 p-5 sm:p-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium text-gray-700">
              Reconciliation Settings
            </h2>
            <p className="text-sm text-gray-500">
              Configure how transactions are reconciled
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-all hover:bg-gray-50">
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-gray-900">
              Auto-Reconciliation
            </h3>
            <p className="text-sm text-gray-500">
              Automatically reconcile matching transactions
            </p>
          </div>
          <Switch
            fn={() => setAutoReconciliation(!autoReconciliation)}
            checked={autoReconciliation}
            disabled={saving}
          />
        </div>

        {autoReconciliation && (
          <div className="w-full max-w-md space-y-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="reconciliation-window"
              >
                Reconciliation Window
              </label>
              <p className="mb-2 text-sm text-gray-500">
                Set how far back to look for matching transactions
              </p>
              <Combobox
                options={WINDOW_OPTIONS}
                selected={selectedWindow}
                setSelected={setSelectedWindow}
                placeholder="Select window size..."
                searchPlaceholder="Search window sizes..."
                emptyState="No matching window sizes found"
                optionRight={(option) => (
                  <span className="text-sm text-gray-500">
                    {option.meta.description}
                  </span>
                )}
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="matching-strategy"
              >
                Matching Strategy
              </label>
              <p className="mb-2 text-sm text-gray-500">
                Choose how transactions are matched
              </p>
              <Combobox
                options={STRATEGY_OPTIONS}
                selected={selectedStrategy}
                setSelected={setSelectedStrategy}
                placeholder="Select matching strategy..."
                searchPlaceholder="Search strategies..."
                emptyState="No matching strategies found"
                optionRight={(option) => (
                  <span className="text-sm text-gray-500">
                    {option.meta.description}
                  </span>
                )}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between space-x-4 rounded-b-lg border border-gray-200 bg-gray-50 p-3 sm:px-10">
          <p className="text-sm text-gray-500">
            These settings determine how transactions are automatically
            reconciled in your system.
          </p>
          <div>
            <Button
              text={saving ? "Saving..." : "Save Changes"}
              loading={saving}
              disabled={
                saving ||
                (autoReconciliation === initialAutoReconciliation &&
                  Number(selectedWindow?.value) === initialWindow &&
                  selectedStrategy?.value === initialStrategy)
              }
              onClick={handleUpdateSettings}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
