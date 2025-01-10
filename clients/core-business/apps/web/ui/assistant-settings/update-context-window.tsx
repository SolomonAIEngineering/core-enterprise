import { Button, Combobox, type ComboboxOption } from "@dub/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const CONTEXT_WINDOW_OPTIONS: ComboboxOption<{ description: string }>[] = [
  {
    label: "1 Message",
    value: "1",
    meta: { description: "Only consider the last message" },
  },
  {
    label: "2 Messages",
    value: "2",
    meta: { description: "Consider the last two messages" },
  },
  {
    label: "4 Messages",
    value: "4",
    meta: { description: "Balanced context (Recommended)" },
  },
  {
    label: "6 Messages",
    value: "6",
    meta: { description: "Extended context" },
  },
  { label: "8 Messages", value: "8", meta: { description: "Maximum context" } },
];

export default function UpdateContextWindow({
  currentContextWindow,
}: {
  currentContextWindow: number;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [selectedOption, setSelectedOption] = useState<ComboboxOption | null>(
    CONTEXT_WINDOW_OPTIONS.find(
      (opt) => opt.value === String(currentContextWindow),
    ) || null,
  );

  const handleUpdateContextWindow = async () => {
    if (
      !selectedOption ||
      Number(selectedOption.value) === currentContextWindow
    )
      return;

    setSaving(true);
    try {
      const response = await fetch("/api/ai-settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contextWindow: Number(selectedOption.value),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      toast.success("Context window size updated successfully!");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Error updating context window size",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await handleUpdateContextWindow();
      }}
      className="rounded-lg border border-gray-200 bg-white"
    >
      <div className="flex flex-col space-y-3 p-5 sm:p-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium text-gray-700">
              Context Window Size
            </h2>
            <p className="text-sm text-gray-500">
              Choose how many previous messages the AI should consider
            </p>
          </div>
        </div>

        <div className="w-full max-w-md">
          <Combobox
            options={CONTEXT_WINDOW_OPTIONS}
            selected={selectedOption}
            setSelected={setSelectedOption}
            placeholder="Select context window size..."
            searchPlaceholder="Search sizes..."
            emptyState="No matching sizes found"
            optionRight={(option) => (
              <span className="text-sm text-gray-500">
                {option.meta.description}
              </span>
            )}
          />
        </div>

        <div className="flex items-center justify-between space-x-4 rounded-b-lg border border-gray-200 bg-gray-50 p-3 sm:px-10">
          <p className="text-sm text-gray-500">
            This will affect how much conversation history the AI considers when
            generating responses.
          </p>
          <div>
            <Button
              text={saving ? "Saving..." : "Save Changes"}
              loading={saving}
              disabled={
                !selectedOption ||
                Number(selectedOption.value) === currentContextWindow
              }
              onClick={handleUpdateContextWindow}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
