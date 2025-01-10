"use client";

import { Button, Combobox, Switch } from "@dub/ui";

import type { ComboboxOption } from "@dub/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

// Common currency options
const CURRENCY_OPTIONS: Array<
  ComboboxOption & { meta: { description: string } }
> = [
  {
    label: "USD - US Dollar",
    value: "USD",
    meta: { description: "United States Dollar" },
  },
  { label: "EUR - Euro", value: "EUR", meta: { description: "Euro" } },
  {
    label: "GBP - British Pound",
    value: "GBP",
    meta: { description: "British Pound Sterling" },
  },
  {
    label: "JPY - Japanese Yen",
    value: "JPY",
    meta: { description: "Japanese Yen" },
  },
  {
    label: "CAD - Canadian Dollar",
    value: "CAD",
    meta: { description: "Canadian Dollar" },
  },
  {
    label: "AUD - Australian Dollar",
    value: "AUD",
    meta: { description: "Australian Dollar" },
  },
];

interface UpdateCurrencyProps {
  defaultCurrency: string;
  enableMultiCurrency: boolean;
  supportedCurrencies: string[] | null;
}

export default function UpdateCurrency({
  defaultCurrency,
  enableMultiCurrency,
  supportedCurrencies,
}: UpdateCurrencyProps) {
  const router = useRouter();
  const [selectedCurrency, setSelectedCurrency] = useState(defaultCurrency);
  const [isMultiCurrencyEnabled, setIsMultiCurrencyEnabled] =
    useState(enableMultiCurrency);
  const [selectedSupportedCurrencies, setSelectedSupportedCurrencies] =
    useState<string[]>(supportedCurrencies || []);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/financial-settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          defaultCurrency: selectedCurrency,
          enableMultiCurrency: isMultiCurrencyEnabled,
          supportedCurrencies: JSON.stringify(selectedSupportedCurrencies),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update currency settings");
      }

      toast.success("Successfully updated currency settings");
      router.refresh();
    } catch (error) {
      toast.error("Failed to update currency settings");
    } finally {
      setSaving(false);
    }
  };

  const handleMultiCurrencyToggle = (enabled: boolean) => {
    setIsMultiCurrencyEnabled(enabled);
    if (!enabled) {
      setSelectedSupportedCurrencies([selectedCurrency]);
    }
  };

  const handleSupportedCurrencyChange = (currency: string) => {
    if (selectedSupportedCurrencies.includes(currency)) {
      setSelectedSupportedCurrencies(
        selectedSupportedCurrencies.filter((c) => c !== currency),
      );
    } else {
      setSelectedSupportedCurrencies([
        ...selectedSupportedCurrencies,
        currency,
      ]);
    }
  };

  const isChanged =
    selectedCurrency !== defaultCurrency ||
    isMultiCurrencyEnabled !== enableMultiCurrency ||
    JSON.stringify(selectedSupportedCurrencies) !==
      JSON.stringify(supportedCurrencies);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await handleSave();
      }}
      className="rounded-lg border border-gray-200 bg-white"
    >
      <div className="flex flex-col space-y-3 p-5 sm:p-10">
        <div className="flex flex-col space-y-3">
          <h2 className="text-base font-medium">Currency Settings</h2>
          <p className="text-sm text-gray-500">
            Configure your default currency and multi-currency support.
          </p>

          <div className="flex flex-col space-y-4 pt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Default Currency
              </label>
              <div className="mt-1">
                <Combobox
                  selected={
                    CURRENCY_OPTIONS.find(
                      (opt) => opt.value === selectedCurrency,
                    ) || null
                  }
                  setSelected={(option) =>
                    option && setSelectedCurrency(option.value)
                  }
                  placeholder="Select default currency"
                  options={CURRENCY_OPTIONS}
                  optionRight={(option) => (
                    <span className="text-sm text-gray-500">
                      {option.meta.description}
                    </span>
                  )}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Enable Multi-Currency Support
                </h3>
                <p className="text-sm text-gray-500">
                  Allow transactions in multiple currencies
                </p>
              </div>
              <Switch
                fn={handleMultiCurrencyToggle}
                checked={isMultiCurrencyEnabled}
                disabled={saving}
              />
            </div>

            {isMultiCurrencyEnabled && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Supported Currencies
                </label>
                <div className="mt-2 space-y-2">
                  {CURRENCY_OPTIONS.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={selectedSupportedCurrencies.includes(
                          option.value,
                        )}
                        onChange={() =>
                          handleSupportedCurrencyChange(option.value)
                        }
                        disabled={option.value === selectedCurrency}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <Button
                text={saving ? "Saving..." : "Save Changes"}
                loading={saving}
                disabled={!isChanged || saving}
                onClick={handleSave}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
