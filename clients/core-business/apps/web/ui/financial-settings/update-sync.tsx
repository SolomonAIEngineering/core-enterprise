import { Button, Combobox, type ComboboxOption } from "@dub/ui";
import { SyncFrequency } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const SYNC_OPTIONS: ComboboxOption<{ description: string }>[] = [
  {
    label: "Real-time",
    value: "REALTIME",
    meta: { description: "Sync transactions as they occur" },
  },
  {
    label: "Daily",
    value: "DAILY",
    meta: { description: "Sync transactions once per day (Recommended)" },
  },
  {
    label: "Weekly",
    value: "WEEKLY",
    meta: { description: "Sync transactions once per week" },
  },
];

export default function UpdateSync({
  syncFrequency: initialFrequency,
  lastSuccessfulSync,
  syncStatus,
}: {
  syncFrequency: SyncFrequency;
  lastSuccessfulSync: Date | null;
  syncStatus: string | null;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [selectedFrequency, setSelectedFrequency] =
    useState<ComboboxOption | null>(
      SYNC_OPTIONS.find((opt) => opt.value === initialFrequency) || null,
    );

  const handleUpdateSync = async () => {
    if (!selectedFrequency || selectedFrequency.value === initialFrequency)
      return;

    setSaving(true);
    try {
      const response = await fetch("/api/financial-settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          syncFrequency: selectedFrequency.value,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      toast.success("Sync frequency updated successfully!");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Error updating sync frequency",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await handleUpdateSync();
      }}
      className="rounded-lg border border-gray-200 bg-white"
    >
      <div className="flex flex-col space-y-3 p-5 sm:p-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium text-gray-700">Sync Settings</h2>
            <p className="text-sm text-gray-500">
              Configure how often your financial data is synchronized
            </p>
          </div>
        </div>

        <div className="w-full max-w-md">
          <Combobox
            options={SYNC_OPTIONS}
            selected={selectedFrequency}
            setSelected={setSelectedFrequency}
            placeholder="Select sync frequency..."
            searchPlaceholder="Search frequencies..."
            emptyState="No matching frequencies found"
            optionRight={(option) => (
              <span className="text-sm text-gray-500">
                {option.meta.description}
              </span>
            )}
          />
        </div>

        {lastSuccessfulSync && (
          <div className="rounded-lg border border-gray-200 p-4">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-gray-900">
                Last Successful Sync
              </h3>
              <p className="text-sm text-gray-500">
                {new Date(lastSuccessfulSync).toLocaleString()}
              </p>
            </div>
          </div>
        )}

        {syncStatus && (
          <div
            className={`rounded-lg border p-4 ${
              syncStatus === "SUCCESS"
                ? "border-green-200 bg-green-50"
                : syncStatus === "FAILED"
                  ? "border-red-200 bg-red-50"
                  : "border-yellow-200 bg-yellow-50"
            }`}
          >
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-gray-900">Sync Status</h3>
              <p
                className={`text-sm ${
                  syncStatus === "SUCCESS"
                    ? "text-green-600"
                    : syncStatus === "FAILED"
                      ? "text-red-600"
                      : "text-yellow-600"
                }`}
              >
                {syncStatus === "SUCCESS"
                  ? "Last sync completed successfully"
                  : syncStatus === "FAILED"
                    ? "Last sync failed"
                    : "Sync in progress"}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between space-x-4 rounded-b-lg border border-gray-200 bg-gray-50 p-3 sm:px-10">
          <p className="text-sm text-gray-500">
            This setting determines how frequently your financial data is
            synchronized with external sources.
          </p>
          <div>
            <Button
              text={saving ? "Saving..." : "Save Changes"}
              loading={saving}
              disabled={
                !selectedFrequency ||
                selectedFrequency.value === initialFrequency
              }
              onClick={handleUpdateSync}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
