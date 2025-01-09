import { Button, Combobox, type ComboboxOption } from "@dub/ui";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

const HISTORY_RETENTION_OPTIONS: ComboboxOption<{ description: string }>[] = [
  { label: "7 Days", value: "7", meta: { description: "Keep history for one week" } },
  { label: "14 Days", value: "14", meta: { description: "Keep history for two weeks" } },
  { label: "30 Days", value: "30", meta: { description: "Keep history for a month (Recommended)" } },
  { label: "60 Days", value: "60", meta: { description: "Keep history for two months" } },
  { label: "90 Days", value: "90", meta: { description: "Keep history for three months" } },
];

export default function UpdateHistoryRetention({
  currentRetentionDays,
}: {
  currentRetentionDays: number;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [selectedOption, setSelectedOption] = useState<ComboboxOption | null>(
    HISTORY_RETENTION_OPTIONS.find(opt => opt.value === String(currentRetentionDays)) || null
  );

  const handleUpdateRetention = async () => {
    if (!selectedOption || Number(selectedOption.value) === currentRetentionDays) return;

    setSaving(true);
    try {
      const response = await fetch("/api/ai-settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          historyRetentionDays: Number(selectedOption.value),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      toast.success("History retention updated successfully!");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error updating history retention");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await handleUpdateRetention();
      }}
      className="rounded-lg border border-gray-200 bg-white"
    >
      <div className="flex flex-col space-y-3 p-5 sm:p-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium text-gray-700">History Retention</h2>
            <p className="text-sm text-gray-500">Choose how long to retain your conversation history</p>
          </div>
        </div>

        <div className="w-full max-w-md">
          <Combobox
            options={HISTORY_RETENTION_OPTIONS}
            selected={selectedOption}
            setSelected={setSelectedOption}
            placeholder="Select retention period..."
            searchPlaceholder="Search periods..."
            emptyState="No matching periods found"
            optionRight={(option) => (
              <span className="text-sm text-gray-500">{option.meta.description}</span>
            )}
          />
        </div>

        <div className="flex items-center justify-between space-x-4 rounded-b-lg border border-gray-200 bg-gray-50 p-3 sm:px-10">
          <p className="text-sm text-gray-500">
            Older conversations will be automatically deleted after the selected period.
          </p>
          <div>
            <Button
              text={saving ? "Saving..." : "Save Changes"}
              loading={saving}
              disabled={!selectedOption || Number(selectedOption.value) === currentRetentionDays}
              onClick={handleUpdateRetention}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
