import { Button, Switch } from "@dub/ui";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function UpdateCustomKnowledge({
  currentKnowledgeIds,
  useCustomKnowledge: initialUseCustomKnowledge,
}: {
  currentKnowledgeIds: string;
  useCustomKnowledge: boolean;
}) {
  const router = useRouter();
  const [updating, setUpdating] = useState(false);
  const [knowledgeIds, setKnowledgeIds] = useState(currentKnowledgeIds || "");
  const [isEnabled, setIsEnabled] = useState(initialUseCustomKnowledge);

  async function updateCustomKnowledge(enabled: boolean) {
    setUpdating(true);
    try {
      const response = await fetch("/api/ai-settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          useCustomKnowledge: enabled,
          customKnowledgeIds: enabled ? knowledgeIds : null,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.message);
        // Reset switch state on error
        setIsEnabled(!enabled);
        return;
      }

      setIsEnabled(enabled);
      toast.success("Custom knowledge settings updated successfully!");
      router.refresh();
    } catch (error) {
      toast.error("Error updating custom knowledge settings");
      // Reset switch state on error
      setIsEnabled(!enabled);
    } finally {
      setUpdating(false);
    }
  }

  async function handleSaveKnowledgeIds() {
    if (!isEnabled) return;

    setUpdating(true);
    try {
      const response = await fetch("/api/ai-settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customKnowledgeIds: knowledgeIds,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.message);
        return;
      }

      toast.success("Knowledge base IDs updated successfully!");
      router.refresh();
    } catch (error) {
      toast.error("Error updating knowledge base IDs");
    } finally {
      setUpdating(false);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSaveKnowledgeIds();
      }}
      className="rounded-lg border border-gray-200 bg-white"
    >
      <div className="flex flex-col space-y-3 p-5 sm:p-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium text-gray-700">
              Custom Knowledge Base
            </h2>
            <p className="text-sm text-gray-500">
              Use your own knowledge base for AI responses
            </p>
          </div>
          <Switch
            fn={() => updateCustomKnowledge(!isEnabled)}
            checked={isEnabled}
            disabled={updating}
          />
        </div>

        {isEnabled && (
          <>
            <div className="mt-4">
              <label
                htmlFor="knowledgeIds"
                className="block text-sm font-medium text-gray-700"
              >
                Knowledge Base IDs
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="knowledgeIds"
                  value={knowledgeIds}
                  onChange={(e) => setKnowledgeIds(e.target.value)}
                  disabled={updating}
                  placeholder="Enter comma-separated knowledge base IDs"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Enter the IDs of your knowledge bases, separated by commas.
              </p>
            </div>

            <div className="flex items-center justify-between space-x-4 rounded-b-lg border border-gray-200 bg-gray-50 p-3 sm:px-10">
              <p className="text-sm text-gray-500">
                Click save to update your knowledge base IDs.
              </p>
              <div>
                <Button
                  text={updating ? "Saving..." : "Save Changes"}
                  loading={updating}
                  disabled={updating || knowledgeIds === currentKnowledgeIds}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </form>
  );
}
