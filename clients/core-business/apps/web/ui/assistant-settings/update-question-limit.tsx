import { Button } from "@dub/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const QUESTION_LIMIT_OPTIONS = [
  { value: null, label: "Unlimited", description: "No daily limit" },
  { value: 10, label: "10 Questions", description: "Basic usage" },
  { value: 25, label: "25 Questions", description: "Standard usage" },
  { value: 50, label: "50 Questions", description: "Professional usage" },
  { value: 100, label: "100 Questions", description: "Enterprise usage" },
] as const;

export default function UpdateQuestionLimit({
  maxQuestionsPerDay: initialLimit,
}: {
  maxQuestionsPerDay: number | null;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [selectedLimit, setSelectedLimit] = useState<number | null>(
    initialLimit,
  );

  async function handleSaveLimit() {
    if (selectedLimit === initialLimit) return;

    setSaving(true);
    try {
      const response = await fetch("/api/ai-settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          maxQuestionsPerDay: selectedLimit,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      toast.success("Daily question limit updated successfully!");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Error updating daily question limit",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSaveLimit();
      }}
      className="rounded-lg border border-gray-200 bg-white"
    >
      <div className="flex flex-col space-y-3 p-5 sm:p-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium text-gray-700">
              Daily Question Limit
            </h2>
            <p className="text-sm text-gray-500">
              Set a daily limit for the number of questions you can ask
            </p>
          </div>
        </div>

        <div className="w-full max-w-md space-y-2">
          {QUESTION_LIMIT_OPTIONS.map((option) => (
            <div
              key={option.value || "unlimited"}
              className={`flex items-center space-x-2 rounded-md border p-3 transition-all hover:bg-gray-50 ${
                selectedLimit === option.value
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
              }`}
            >
              <input
                type="radio"
                id={`limit-${option.value || "unlimited"}`}
                name="questionLimit"
                value={option.value || ""}
                checked={selectedLimit === option.value}
                onChange={(e) =>
                  setSelectedLimit(
                    e.target.value ? Number(e.target.value) : null,
                  )
                }
                disabled={saving}
                className="h-4 w-4 text-blue-600"
              />
              <label
                htmlFor={`limit-${option.value || "unlimited"}`}
                className="flex flex-1 cursor-pointer flex-col"
              >
                <span className="text-sm font-medium text-gray-900">
                  {option.label}
                </span>
                <span className="text-sm text-gray-500">
                  {option.description}
                </span>
              </label>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between space-x-4 rounded-b-lg border border-gray-200 bg-gray-50 p-3 sm:px-10">
          <p className="text-sm text-gray-500">
            This will control how many questions you can ask the AI assistant
            per day.
          </p>
          <div>
            <Button
              text={saving ? "Saving..." : "Save Changes"}
              loading={saving}
              disabled={saving || selectedLimit === initialLimit}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
