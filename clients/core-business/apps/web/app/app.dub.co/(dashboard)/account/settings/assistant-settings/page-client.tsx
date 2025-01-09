"use client";

import UpdateContextWindow from "@/ui/ai-settings/update-context-window";
import UpdateCustomKnowledge from "@/ui/ai-settings/update-custom-knowledge";
import UpdateFeatures from "@/ui/ai-settings/update-features";
import UpdateHistoryRetention from "@/ui/ai-settings/update-history-retention";
import UpdateLanguageStyle from "@/ui/ai-settings/update-language-style";
import UpdateQuestionLimit from "@/ui/ai-settings/update-question-limit";
import UpdateResponseLength from "@/ui/ai-settings/update-response-length";
import { useAISettings } from "@/lib/swr/use-ai-settings";

export default function SettingsAISettingsPageClient() {
  const { settings } = useAISettings();

  if (!settings) return null;

  return (
    <div className="flex flex-col space-y-6">
      <UpdateContextWindow currentContextWindow={settings.contextWindow} />
      <UpdateHistoryRetention currentRetentionDays={settings.historyRetentionDays} />
      <UpdateCustomKnowledge
        currentKnowledgeIds={settings.customKnowledgeIds || ""}
        useCustomKnowledge={settings.useCustomKnowledge}
      />
      <UpdateFeatures
        enableCitations={settings.enableCitations}
        enableFollowUp={settings.enableFollowUp}
      />
      <UpdateLanguageStyle languageStyle={settings.languageStyle || null} />
      <UpdateQuestionLimit maxQuestionsPerDay={settings.maxQuestionsPerDay || null} />
      <UpdateResponseLength preferredResponseLength={settings.preferredResponseLength || null} />
    </div>
  );
}
