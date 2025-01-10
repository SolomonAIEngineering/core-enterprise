/**
 * Component for updating a user's preferred date format.
 * Allows users to select from common date format patterns and preview how dates will be displayed.
 *
 * @component
 * @example
 * ```tsx
 * <UpdateDateFormat currentFormat="MM/DD/YYYY" />
 * ```
 */

import { Button, Combobox, type ComboboxOption } from "@dub/ui";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

const DATE_FORMAT_OPTIONS: ComboboxOption<{ example: string }>[] = [
  { label: "MM/DD/YYYY", value: "MM/DD/YYYY", meta: { example: "12/31/2023" } },
  { label: "DD/MM/YYYY", value: "DD/MM/YYYY", meta: { example: "31/12/2023" } },
  { label: "YYYY-MM-DD", value: "YYYY-MM-DD", meta: { example: "2023-12-31" } },
  { label: "DD.MM.YYYY", value: "DD.MM.YYYY", meta: { example: "31.12.2023" } },
  {
    label: "DD-MMM-YYYY",
    value: "DD-MMM-YYYY",
    meta: { example: "31-Dec-2023" },
  },
  {
    label: "MMMM DD, YYYY",
    value: "MMMM DD, YYYY",
    meta: { example: "December 31, 2023" },
  },
];

export default function UpdateDateFormat({
  currentFormat,
}: {
  currentFormat: string;
}) {
  const { update } = useSession();
  const [saving, setSaving] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<ComboboxOption | null>(
    DATE_FORMAT_OPTIONS.find((opt) => opt.value === currentFormat) || null,
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
          dateFormat: selectedFormat.value,
        }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error.message);
      }

      await update();
      toast.success("Date format updated successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update date format",
      );
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
          success: "Successfully updated your date format!",
          error: (error) => error,
        });
      }}
      className="rounded-lg border border-gray-200 bg-white"
    >
      <div className="flex flex-col space-y-3 p-5 sm:p-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium text-gray-700">Date Format</h2>
            <p className="text-sm text-gray-500">
              Choose how dates should be displayed
            </p>
          </div>
        </div>

        <div className="w-full max-w-md">
          <Combobox
            options={DATE_FORMAT_OPTIONS}
            selected={selectedFormat}
            setSelected={setSelectedFormat}
            placeholder="Select date format..."
            searchPlaceholder="Search formats..."
            emptyState="No matching formats found"
            optionRight={(option) => (
              <span className="text-sm text-gray-500">
                {option.meta.example}
              </span>
            )}
          />
        </div>

        <div className="flex items-center justify-between space-x-4 rounded-b-lg border border-gray-200 bg-gray-50 p-3 sm:px-10">
          <p className="text-sm text-gray-500">
            This will how your dates are displayed in your calendar and all your
            scheduled tasks.
          </p>
          <div>
            <Button
              text={saving ? "Saving..." : "Save"}
              loading={saving}
              disabled={
                !selectedFormat || selectedFormat.value === currentFormat
              }
              onClick={handleUpdateFormat}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
