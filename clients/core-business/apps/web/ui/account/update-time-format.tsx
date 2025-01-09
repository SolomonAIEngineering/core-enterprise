/**
 * Component for updating a user's preferred time format.
 * Allows users to choose between 12-hour and 24-hour time formats with live preview.
 *
 * @component
 * @example
 * ```tsx
 * <UpdateTimeFormat currentFormat="hh:mm A" />
 * ```
 */

import { Button, Combobox, type ComboboxOption } from "@dub/ui";
import { useState } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

const TIME_FORMAT_OPTIONS: ComboboxOption<{ example: string }>[] = [
  { label: "12-hour", value: "0", meta: { example: "02:30 PM" } },
  { label: "24-hour", value: "1", meta: { example: "14:30" } },
  { label: "12-hour with seconds", value: "2", meta: { example: "02:30:45 PM" } },
  { label: "24-hour with seconds", value: "3", meta: { example: "14:30:45" } },
];

export default function UpdateTimeFormat({
  currentFormat,
}: {
  currentFormat: string;
}) {
  const { update } = useSession();
  const [saving, setSaving] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<ComboboxOption | null>(
    TIME_FORMAT_OPTIONS.find(opt => opt.value === currentFormat) || null
  );

  const handleUpdateFormat = async () => {
    if (!selectedFormat || selectedFormat.value === currentFormat) return;

    setSaving(true);
    try {
      const response = await fetch("/api/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          timeFormat: selectedFormat.value,
        }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error.message);
      }

      await update();
      toast.success("Time format updated successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update time format");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        toast.promise(handleUpdateFormat(), {
          loading: "Saving changes...",
          success: "Successfully updated your time format!",
          error: (error) => error,
        });
      }}
      className="rounded-lg border border-gray-200 bg-white"
    >
      <div className="flex flex-col space-y-3 p-5 sm:p-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium text-gray-700">Time Format</h2>
            <p className="text-sm text-gray-500">Choose how times should be displayed</p>
          </div>

        </div>

        <div className="w-full max-w-md">
          <Combobox
            options={TIME_FORMAT_OPTIONS}
            selected={selectedFormat}
            setSelected={setSelectedFormat}
            placeholder="Select time format..."
            searchPlaceholder="Search formats..."
            emptyState="No matching formats found"
            optionRight={(option) => (
              <span className="text-sm text-gray-500">{option.meta.example}</span>
            )}
          />
        </div>

        <div className="flex items-center justify-between space-x-4 rounded-b-lg border border-gray-200 bg-gray-50 p-3 sm:px-10">
          <p className="text-sm text-gray-500">
            This will affect the manner in which your financial data is displayed.
          </p>
          <div>
            <Button
              text={saving ? "Saving..." : "Save"}
              loading={saving}
              disabled={!selectedFormat || selectedFormat.value === currentFormat}
              onClick={handleUpdateFormat}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
