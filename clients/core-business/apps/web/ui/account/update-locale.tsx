/**
 * Component for updating a user's locale/language preference.
 * Provides a searchable list of available locales with native language names and regions.
 *
 * @component
 * @example
 * ```tsx
 * <UpdateLocale currentLocale="en-US" />
 * ```
 */

import { Button, Combobox, type ComboboxOption } from "@dub/ui";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

// Helper function to get native language name
const getLanguageName = (locale: string): string => {
  try {
    return (
      new Intl.DisplayNames([locale], { type: "language" }).of(
        locale.split("-")[0],
      ) || locale
    );
  } catch {
    return locale;
  }
};

// Helper function to get region name
const getRegionName = (locale: string): string | null => {
  try {
    const region = locale.split("-")[1];
    return region
      ? new Intl.DisplayNames([locale], { type: "region" }).of(region) || null
      : null;
  } catch {
    return null;
  }
};

// Generate locale options with native names and regions
const COMMON_LOCALES = [
  "en-US",
  "en-GB",
  "es-ES",
  "fr-FR",
  "de-DE",
  "it-IT",
  "pt-BR",
  "ja-JP",
  "ko-KR",
  "zh-CN",
];

const LOCALE_OPTIONS: ComboboxOption<{
  nativeName: string;
  region: string | null;
}>[] = COMMON_LOCALES.map((locale) => {
  const nativeName = getLanguageName(locale);
  const region = getRegionName(locale);

  return {
    label: `${nativeName}${region ? ` (${region})` : ""}`,
    value: locale,
    meta: {
      nativeName,
      region,
    },
  };
}).sort((a, b) => a.label.localeCompare(b.label));

export default function UpdateLocale({
  currentLocale,
}: {
  currentLocale: string;
}) {
  const { update } = useSession();
  const [saving, setSaving] = useState(false);
  const [selectedLocale, setSelectedLocale] = useState<ComboboxOption | null>(
    LOCALE_OPTIONS.find((opt) => opt.value === currentLocale) || null,
  );

  const handleUpdateLocale = async () => {
    if (!selectedLocale || selectedLocale.value === currentLocale) return;

    setSaving(true);
    try {
      const response = await fetch("/api/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          locale: selectedLocale.value,
        }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error.message);
      }

      await update();
      toast.success("Language preference updated successfully");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update language preference",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        toast.promise(handleUpdateLocale(), {
          loading: "Saving changes...",
          success: "Successfully updated your language preference!",
          error: (error) => error,
        });
      }}
      className="rounded-lg border border-gray-200 bg-white"
    >
      <div className="flex flex-col space-y-3 p-5 sm:p-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium text-gray-700">
              Language & Region
            </h2>
            <p className="text-sm text-gray-500">
              Choose your preferred language and regional format
            </p>
          </div>
        </div>

        <div className="w-full max-w-md">
          <Combobox
            options={LOCALE_OPTIONS}
            selected={selectedLocale}
            setSelected={setSelectedLocale}
            placeholder="Select language and region..."
            searchPlaceholder="Search languages..."
            emptyState="No matching languages found"
            optionRight={(option) => (
              <span className="text-sm text-gray-500">{option.value}</span>
            )}
          />
        </div>

        <div className="flex items-center justify-between space-x-4 rounded-b-lg border border-gray-200 bg-gray-50 p-3 sm:px-10">
          <p className="text-sm text-gray-500">
            The language reporting on your account will be displayed in.
          </p>
          <div>
            <Button
              text={saving ? "Saving..." : "Save"}
              loading={saving}
              disabled={
                !selectedLocale || selectedLocale.value === currentLocale
              }
              onClick={handleUpdateLocale}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
