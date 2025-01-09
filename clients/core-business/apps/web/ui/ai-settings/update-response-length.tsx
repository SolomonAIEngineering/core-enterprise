/**
 * Component for updating AI response length preferences.
 * Provides radio options to select the desired level of detail in AI responses.
 *
 * @component
 * @example
 * ```tsx
 * <UpdateResponseLength />
 * ```
 */

import { Button } from "@dub/ui";
import { PreferredResponseLength } from "@/lib/zod/schemas/ai-settings";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RESPONSE_OPTIONS = [
  { value: "concise", label: "Concise", description: "Brief and to the point responses" },
  { value: "balanced", label: "Balanced", description: "Moderate level of detail (Recommended)" },
  { value: "detailed", label: "Detailed", description: "Comprehensive responses with more context" },
] as const;

export default function UpdateResponseLength({
  preferredResponseLength: initialLength,
}: {
  preferredResponseLength: PreferredResponseLength;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [selectedLength, setSelectedLength] = useState<PreferredResponseLength>(initialLength);

  const handleSaveLength = async () => {
    if (selectedLength === initialLength) return;

    setSaving(true);
    try {
      const response = await fetch("/api/ai-settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          preferredResponseLength: selectedLength,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      toast.success("Response length preference updated successfully!");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error updating response length preference");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSaveLength();
      }}
      className="rounded-lg border border-gray-200 bg-white"
    >
      <div className="flex flex-col space-y-3 p-5 sm:p-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium text-gray-700">Response Length</h2>
            <p className="text-sm text-gray-500">Choose your preferred level of detail in AI responses</p>
          </div>
        </div>

        <div className="w-full max-w-md space-y-3">
          {RESPONSE_OPTIONS.map((option) => (
            <div
              key={option.value}
              className={`flex items-center space-x-3 rounded-lg border p-4 transition-all hover:bg-gray-50 ${selectedLength === option.value
                ? "border-blue-500 bg-blue-50 hover:bg-blue-50"
                : "border-gray-200"
                }`}
            >
              <input
                type="radio"
                id={option.value}
                name="responseLength"
                value={option.value}
                checked={selectedLength === option.value}
                onChange={(e) => setSelectedLength(e.target.value as PreferredResponseLength)}
                disabled={saving}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor={option.value} className="flex flex-1 cursor-pointer flex-col">
                <span className="text-sm font-medium text-gray-900">{option.label}</span>
                <span className="text-sm text-gray-500">{option.description}</span>
              </label>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between space-x-4 rounded-b-lg border border-gray-200 bg-gray-50 p-3 sm:px-10">
          <p className="text-sm text-gray-500">
            This setting affects how detailed the AI's responses will be across all conversations.
          </p>
          <div>
            <Button
              text={saving ? "Saving..." : "Save Changes"}
              loading={saving}
              disabled={saving || selectedLength === initialLength}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
