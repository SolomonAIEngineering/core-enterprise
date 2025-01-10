import { Button } from "@dub/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const LANGUAGE_STYLES = [
  { value: null, label: "Default", description: "Standard professional tone" },
  {
    value: "casual",
    label: "Casual",
    description: "Friendly and conversational",
  },
  {
    value: "formal",
    label: "Formal",
    description: "Professional and business-like",
  },
  {
    value: "technical",
    label: "Technical",
    description: "Detailed and precise",
  },
  {
    value: "simple",
    label: "Simple",
    description: "Clear and easy to understand",
  },
] as const;

export default function UpdateLanguageStyle({
  languageStyle: initialLanguageStyle,
}: {
  languageStyle: string | null;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(
    initialLanguageStyle,
  );

  async function handleSaveStyle() {
    if (selectedStyle === initialLanguageStyle) return;

    setSaving(true);
    try {
      const response = await fetch("/api/ai-settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          languageStyle: selectedStyle,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      toast.success("Language style updated successfully!");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Error updating language style",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSaveStyle();
      }}
      className="rounded-lg border border-gray-200 bg-white"
    >
      <div className="flex flex-col space-y-3 p-5 sm:p-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium text-gray-700">
              Language Style
            </h2>
            <p className="text-sm text-gray-500">
              Choose the tone and style of language used in AI responses
            </p>
          </div>
        </div>

        <div className="w-full max-w-md space-y-2">
          {LANGUAGE_STYLES.map((style) => (
            <div
              key={style.value || "default"}
              className={`flex items-center space-x-2 rounded-md border p-3 transition-all hover:bg-gray-50 ${
                selectedStyle === style.value
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
              }`}
            >
              <input
                type="radio"
                id={`style-${style.value || "default"}`}
                name="languageStyle"
                value={style.value || ""}
                checked={selectedStyle === style.value}
                onChange={(e) => setSelectedStyle(e.target.value || null)}
                disabled={saving}
                className="h-4 w-4 text-blue-600"
              />
              <label
                htmlFor={`style-${style.value || "default"}`}
                className="flex flex-1 cursor-pointer flex-col"
              >
                <span className="text-sm font-medium text-gray-900">
                  {style.label}
                </span>
                <span className="text-sm text-gray-500">
                  {style.description}
                </span>
              </label>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between space-x-4 rounded-b-lg border border-gray-200 bg-gray-50 p-3 sm:px-10">
          <p className="text-sm text-gray-500">
            This will affect how the AI communicates with you across all
            conversations.
          </p>
          <div>
            <Button
              text={saving ? "Saving..." : "Save Changes"}
              loading={saving}
              disabled={saving || selectedStyle === initialLanguageStyle}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
