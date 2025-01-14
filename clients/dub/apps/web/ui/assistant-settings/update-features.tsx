/**
 * Component for managing AI feature toggles.
 * Provides switches to enable/disable various AI assistant features.
 *
 * @component
 * @example
 * ```tsx
 * <UpdateFeatures />
 * ```
 */

import { Switch } from "@dub/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const FEATURES = [
  {
    id: "enableCitations",
    title: "Source Citations",
    description: "Include references and sources in AI responses",
  },
  {
    id: "enableFollowUp",
    title: "Follow-up Suggestions",
    description: "Show suggested follow-up questions after each response",
  },
] as const;

export default function UpdateFeatures({
  enableCitations: initialEnableCitations,
  enableFollowUp: initialEnableFollowUp,
}: {
  enableCitations: boolean;
  enableFollowUp: boolean;
}) {
  const router = useRouter();
  const [updating, setUpdating] = useState(false);
  const [features, setFeatures] = useState({
    enableCitations: initialEnableCitations,
    enableFollowUp: initialEnableFollowUp,
  });

  const handleUpdateFeature = async (
    feature: "enableCitations" | "enableFollowUp",
    value: boolean,
  ) => {
    // Optimistically update the UI
    setFeatures((prev) => ({ ...prev, [feature]: value }));
    setUpdating(true);

    try {
      const response = await fetch("/api/ai-settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [feature]: value,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        // Revert the change on error
        setFeatures((prev) => ({ ...prev, [feature]: !value }));
        throw new Error(error.message);
      }

      toast.success("Feature settings updated successfully!");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Error updating feature settings",
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
            <h2 className="text-sm font-medium text-gray-700">AI Features</h2>
            <p className="text-sm text-gray-500">
              Enable or disable specific AI assistant capabilities
            </p>
          </div>
        </div>

        <div className="w-full max-w-md space-y-6">
          {FEATURES.map((feature) => (
            <div
              key={feature.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-all hover:bg-gray-50"
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
                disabled={updating}
              />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between space-x-4 rounded-b-lg border border-gray-200 bg-gray-50 p-3 sm:px-10">
          <p className="text-sm text-gray-500">
            These features can be enabled or disabled at any time to customize
            your AI experience.
          </p>
        </div>
      </div>
    </form>
  );
}
