/**
 * Component for updating a user's preferred first day of the week.
 * Allows users to choose between starting their week on Sunday or Monday.
 *
 * @component
 * @example
 * ```tsx
 * <UpdateWeekStart currentWeekStart="monday" />
 * ```
 */

import { Button, Combobox, type ComboboxOption } from "@dub/ui";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

const WEEK_START_OPTIONS: ComboboxOption<{ preview: string[] }>[] = [
  {
    label: "Monday",
    value: "monday",
    meta: {
      preview: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
  },
  {
    label: "Sunday",
    value: "sunday",
    meta: {
      preview: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    },
  },
];

export default function UpdateWeekStart({
  currentWeekStart,
}: {
  currentWeekStart: string;
}) {
  const { update } = useSession();
  const [saving, setSaving] = useState(false);
  const [selectedWeekStart, setSelectedWeekStart] =
    useState<ComboboxOption | null>(
      WEEK_START_OPTIONS.find((opt) => opt.value === currentWeekStart) || null,
    );

  const handleUpdateWeekStart = async () => {
    if (!selectedWeekStart || selectedWeekStart.value === currentWeekStart)
      return;

    setSaving(true);
    try {
      const response = await fetch("/api/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          weekStartsOnMonday:
            selectedWeekStart.value === "monday" ? true : false,
        }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error.message);
      }

      await update();
      toast.success("Week start day updated successfully");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update week start day",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        toast.promise(handleUpdateWeekStart(), {
          loading: "Saving changes...",
          success: "Successfully updated your week start day!",
          error: (error) => error,
        });
      }}
      className="rounded-lg border border-gray-200 bg-white"
    >
      <div className="flex flex-col space-y-3 p-5 sm:p-10">
        <h2 className="text-xl font-medium">Your Default Week Start</h2>
        <p className="text-sm text-gray-500">
          Choose which day your week begins.
        </p>

        <div className="mt-1 max-w-md">
          <Combobox
            options={WEEK_START_OPTIONS}
            selected={selectedWeekStart}
            setSelected={setSelectedWeekStart}
            placeholder="Select week start day..."
            emptyState="No matching options found"
            optionRight={(option) => (
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                {option.meta.preview.map((day, i) => (
                  <span
                    key={day}
                    className={`${i === 0 ? "font-medium text-gray-700" : ""}`}
                  >
                    {day}
                  </span>
                ))}
              </div>
            )}
          />
        </div>

        <div className="flex items-center justify-between space-x-4 rounded-b-lg border border-gray-200 bg-gray-50 p-3 sm:px-10">
          <p className="text-sm text-gray-500">
            This will affect your calendar and all your scheduled tasks.
          </p>
          <div>
            <Button
              text={saving ? "Saving..." : "Save"}
              loading={saving}
              disabled={
                !selectedWeekStart ||
                selectedWeekStart.value === currentWeekStart
              }
              onClick={handleUpdateWeekStart}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
