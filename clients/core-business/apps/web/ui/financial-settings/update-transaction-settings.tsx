import { Button, Combobox, type ComboboxOption, Switch } from "@dub/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const AMOUNT_LIMIT_OPTIONS: ComboboxOption<{ description: string }>[] = [
  {
    label: "No Limit",
    value: "0",
    meta: { description: "No minimum or maximum amount" },
  },
  {
    label: "$10",
    value: "10",
    meta: { description: "Minimum transaction amount" },
  },
  {
    label: "$50",
    value: "50",
    meta: { description: "Standard minimum amount" },
  },
  {
    label: "$100",
    value: "100",
    meta: { description: "Higher minimum amount" },
  },
  {
    label: "$1,000",
    value: "1000",
    meta: { description: "Maximum transaction amount" },
  },
  {
    label: "$5,000",
    value: "5000",
    meta: { description: "Higher maximum amount" },
  },
  {
    label: "$10,000",
    value: "10000",
    meta: { description: "Very high maximum amount" },
  },
];

export default function UpdateTransactionSettings({
  autoCategorizeTxn: initialAutoCategorizeTxn,
  minTxnAmount: initialMinAmount,
  maxTxnAmount: initialMaxAmount,
}: {
  autoCategorizeTxn: boolean;
  minTxnAmount: number | null;
  maxTxnAmount: number | null;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [autoCategorizeTxn, setAutoCategorizeTxn] = useState(
    initialAutoCategorizeTxn,
  );
  const [selectedMinAmount, setSelectedMinAmount] =
    useState<ComboboxOption | null>(
      AMOUNT_LIMIT_OPTIONS.find(
        (opt) => opt.value === String(initialMinAmount),
      ) || AMOUNT_LIMIT_OPTIONS[0],
    );
  const [selectedMaxAmount, setSelectedMaxAmount] =
    useState<ComboboxOption | null>(
      AMOUNT_LIMIT_OPTIONS.find(
        (opt) => opt.value === String(initialMaxAmount),
      ) || AMOUNT_LIMIT_OPTIONS[0],
    );

  const handleUpdateSettings = async () => {
    if (
      autoCategorizeTxn === initialAutoCategorizeTxn &&
      Number(selectedMinAmount?.value) === (initialMinAmount || 0) &&
      Number(selectedMaxAmount?.value) === (initialMaxAmount || 0)
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
          autoCategorizeTxn,
          minTxnAmount: Number(selectedMinAmount?.value) || null,
          maxTxnAmount: Number(selectedMaxAmount?.value) || null,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      toast.success("Transaction settings updated successfully!");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Error updating transaction settings",
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
              Transaction Settings
            </h2>
            <p className="text-sm text-gray-500">
              Configure how transactions are processed and managed
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-all hover:bg-gray-50">
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-gray-900">
              Auto-Categorize Transactions
            </h3>
            <p className="text-sm text-gray-500">
              Automatically categorize transactions based on patterns
            </p>
          </div>
          <Switch
            fn={() => setAutoCategorizeTxn(!autoCategorizeTxn)}
            checked={autoCategorizeTxn}
            disabled={saving}
          />
        </div>

        <div className="w-full max-w-md space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Minimum Transaction Amount
            </label>
            <p className="mb-2 text-sm text-gray-500">
              Set the minimum amount for transactions
            </p>
            <Combobox
              options={AMOUNT_LIMIT_OPTIONS}
              selected={selectedMinAmount}
              setSelected={setSelectedMinAmount}
              placeholder="Select minimum amount..."
              searchPlaceholder="Search amounts..."
              emptyState="No matching amounts found"
              optionRight={(option) => (
                <span className="text-sm text-gray-500">
                  {option.meta.description}
                </span>
              )}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Maximum Transaction Amount
            </label>
            <p className="mb-2 text-sm text-gray-500">
              Set the maximum amount for transactions
            </p>
            <Combobox
              options={AMOUNT_LIMIT_OPTIONS}
              selected={selectedMaxAmount}
              setSelected={setSelectedMaxAmount}
              placeholder="Select maximum amount..."
              searchPlaceholder="Search amounts..."
              emptyState="No matching amounts found"
              optionRight={(option) => (
                <span className="text-sm text-gray-500">
                  {option.meta.description}
                </span>
              )}
            />
          </div>
        </div>

        <div className="flex items-center justify-between space-x-4 rounded-b-lg border border-gray-200 bg-gray-50 p-3 sm:px-10">
          <p className="text-sm text-gray-500">
            These settings affect how transactions are processed and validated
            in your system.
          </p>
          <div>
            <Button
              text={saving ? "Saving..." : "Save Changes"}
              loading={saving}
              disabled={
                saving ||
                (autoCategorizeTxn === initialAutoCategorizeTxn &&
                  Number(selectedMinAmount?.value) ===
                    (initialMinAmount || 0) &&
                  Number(selectedMaxAmount?.value) === (initialMaxAmount || 0))
              }
              onClick={handleUpdateSettings}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
