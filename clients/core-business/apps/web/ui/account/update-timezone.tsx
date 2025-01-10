/**
 * Component for updating a user's timezone preference.
 * Provides a searchable list of all IANA timezones with current time preview.
 *
 * @component
 * @example
 * ```tsx
 * <UpdateTimezone currentTimezone="America/New_York" />
 * ```
 */

import { Button, Combobox, type ComboboxOption } from "@dub/ui";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

// Generate timezone options with current time examples
const TIMEZONE_OPTIONS: ComboboxOption<{ offset: string }>[] =
  Intl.supportedValuesOf("timeZone")
    .map((tz) => {
      const date = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: tz,
        hour: "numeric",
        minute: "numeric",
        timeZoneName: "short",
      });

      // Get UTC offset
      const tzOffset = formatter.format(date).split(" ")[2];

      return {
        label: tz.replace(/_/g, " "),
        value: tz,
        meta: { offset: tzOffset },
      };
    })
    .sort((a, b) => a.label.localeCompare(b.label));

export default function UpdateTimezone({
  currentTimezone,
}: {
  currentTimezone: string;
}) {
  const { update } = useSession();
  const [saving, setSaving] = useState(false);
  const [selectedTimezone, setSelectedTimezone] =
    useState<ComboboxOption | null>(
      TIMEZONE_OPTIONS.find((opt) => opt.value === currentTimezone) || null,
    );

  const handleUpdateTimezone = async () => {
    if (!selectedTimezone || selectedTimezone.value === currentTimezone) return;

    setSaving(true);
    try {
      const response = await fetch("/api/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          timezone: selectedTimezone.value,
        }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error.message);
      }

      await update();
      toast.success("Timezone updated successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update timezone",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        toast.promise(handleUpdateTimezone(), {
          loading: "Saving changes...",
          success: "Successfully updated your timezone!",
          error: (error) => error,
        });
      }}
      className="rounded-lg border border-gray-200 bg-white"
    >
      <div className="flex flex-col space-y-3 p-5 sm:p-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium text-gray-700">Timezone</h2>
            <p className="text-sm text-gray-500">Choose your local timezone</p>
          </div>
        </div>

        <div className="w-full max-w-md">
          <Combobox
            options={TIMEZONE_OPTIONS}
            selected={selectedTimezone}
            setSelected={setSelectedTimezone}
            placeholder="Select timezone..."
            searchPlaceholder="Search timezones..."
            emptyState="No matching timezones found"
            optionRight={(option) => (
              <span className="text-sm text-gray-500">
                {option.meta.offset}
              </span>
            )}
          />
        </div>

        <div className="flex items-center justify-between space-x-4 rounded-b-lg border border-gray-200 bg-gray-50 p-3 sm:px-10">
          <p className="text-sm text-gray-500">
            This will affect the time at which background tasks are run on your
            behalf.
          </p>
          <div>
            <Button
              text={saving ? "Saving..." : "Save"}
              loading={saving}
              disabled={
                !selectedTimezone || selectedTimezone.value === currentTimezone
              }
              onClick={handleUpdateTimezone}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
