import { Switch } from "@dub/ui";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type PaymentFeature = {
  id:
    | "stripeEnabled"
    | "stripeCardPaymentsCapability"
    | "stripeTransfersCapability";
  title: string;
  description: string;
  parent?: "stripeEnabled";
};

const PAYMENT_FEATURES: PaymentFeature[] = [
  {
    id: "stripeEnabled",
    title: "Stripe Integration",
    description: "Enable Stripe as a payment provider",
  },
  {
    id: "stripeCardPaymentsCapability",
    title: "Stripe Card Payments",
    description: "Accept card payments through Stripe",
    parent: "stripeEnabled",
  },
  {
    id: "stripeTransfersCapability",
    title: "Stripe Transfers",
    description: "Enable bank transfers through Stripe",
    parent: "stripeEnabled",
  },
];

export default function UpdatePaymentProviders({
  stripeEnabled: initialStripeEnabled,
  stripeCardPaymentsCapability: initialCardPayments,
  stripeTransfersCapability: initialTransfers,
  activePaymentProviders: initialActiveProviders,
  providerConfigs: initialConfigs,
}: {
  stripeEnabled: boolean;
  stripeCardPaymentsCapability: string | null;
  stripeTransfersCapability: string | null;
  activePaymentProviders: string[] | null;
  providerConfigs: Record<string, any> | null;
}) {
  const router = useRouter();
  const [updating, setUpdating] = useState(false);
  const [features, setFeatures] = useState({
    stripeEnabled: initialStripeEnabled,
    stripeCardPaymentsCapability: initialCardPayments === "active",
    stripeTransfersCapability: initialTransfers === "active",
  });

  const handleUpdateFeature = async (
    feature:
      | "stripeEnabled"
      | "stripeCardPaymentsCapability"
      | "stripeTransfersCapability",
    value: boolean,
  ) => {
    // Don't allow enabling child features if parent is disabled
    if (feature !== "stripeEnabled" && !features.stripeEnabled) return;

    // Optimistically update the UI
    setFeatures((prev) => ({ ...prev, [feature]: value }));
    setUpdating(true);

    try {
      const response = await fetch("/api/financial-settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [feature]: value,
          // If disabling Stripe, also disable capabilities
          ...(feature === "stripeEnabled" && !value
            ? {
                stripeCardPaymentsCapability: null,
                stripeTransfersCapability: null,
              }
            : {}),
          // Convert boolean to status string for capabilities
          ...(feature === "stripeCardPaymentsCapability"
            ? { stripeCardPaymentsCapability: value ? "active" : "inactive" }
            : {}),
          ...(feature === "stripeTransfersCapability"
            ? { stripeTransfersCapability: value ? "active" : "inactive" }
            : {}),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        // Revert the change on error
        setFeatures((prev) => ({ ...prev, [feature]: !value }));
        throw new Error(error.message);
      }

      toast.success("Payment provider settings updated successfully!");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Error updating payment provider settings",
      );
    } finally {
      setUpdating(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="rounded-lg border border-gray-200 bg-white"
    >
      <div className="flex flex-col space-y-3 p-5 sm:p-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium text-gray-700">
              Payment Providers
            </h2>
            <p className="text-sm text-gray-500">
              Configure payment providers and their capabilities
            </p>
          </div>
        </div>

        <div className="w-full max-w-md space-y-6">
          {PAYMENT_FEATURES.map((feature) => (
            <div
              key={feature.id}
              className={`flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-all hover:bg-gray-50 ${
                feature.parent && !features[feature.parent] ? "opacity-50" : ""
              }`}
            >
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
              <Switch
                fn={() => {
                  const currentValue = features[feature.id];
                  handleUpdateFeature(feature.id, !currentValue);
                }}
                checked={features[feature.id]}
                disabled={
                  updating || (feature.parent && !features[feature.parent])
                }
              />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between space-x-4 rounded-b-lg border border-gray-200 bg-gray-50 p-3 sm:px-10">
          <p className="text-sm text-gray-500">
            These settings control which payment providers are available and
            their capabilities.
          </p>
        </div>
      </div>
    </form>
  );
}
