"use client";

import { useAISettings } from "@/lib/swr/use-ai-settings";
import UpdateContextWindow from "@/ui/assistant-settings/update-context-window";
import UpdateCustomKnowledge from "@/ui/assistant-settings/update-custom-knowledge";
import UpdateFeatures from "@/ui/assistant-settings/update-features";
import UpdateHistoryRetention from "@/ui/assistant-settings/update-history-retention";
import UpdateLanguageStyle from "@/ui/assistant-settings/update-language-style";
import UpdateQuestionLimit from "@/ui/assistant-settings/update-question-limit";
import UpdateResponseLength from "@/ui/assistant-settings/update-response-length";

export default function SettingsAISettingsPageClient() {
  const { settings } = useAISettings();

  if (!settings) return null;

  return (
    <div className="flex flex-col space-y-6">
      <UpdateContextWindow currentContextWindow={settings.contextWindow} />
      <UpdateHistoryRetention
        currentRetentionDays={settings.historyRetentionDays}
      />
      <UpdateCustomKnowledge
        currentKnowledgeIds={settings.customKnowledgeIds || ""}
        useCustomKnowledge={settings.useCustomKnowledge}
      />
      <UpdateFeatures
        enableCitations={settings.enableCitations}
        enableFollowUp={settings.enableFollowUp}
      />
      <UpdateLanguageStyle languageStyle={settings.languageStyle || null} />
      <UpdateQuestionLimit
        maxQuestionsPerDay={settings.maxQuestionsPerDay || null}
      />
      <UpdateResponseLength
        preferredResponseLength={settings.preferredResponseLength || null}
      />
    </div>
  );
}
