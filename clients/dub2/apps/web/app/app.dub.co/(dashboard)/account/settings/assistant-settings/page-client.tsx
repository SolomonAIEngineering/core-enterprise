"use client";

import { useAISettings } from "@/lib/swr/use-ai-settings";
import UpdateContextWindow from "@/ui/assistant-settings/update-context-window";
import UpdateCustomKnowledge from "@/ui/assistant-settings/update-custom-knowledge";
import UpdateFeatures from "@/ui/assistant-settings/update-features";
import UpdateHistoryRetention from "@/ui/assistant-settings/update-history-retention";
import UpdateLanguageStyle from "@/ui/assistant-settings/update-language-style";
import UpdateQuestionLimit from "@/ui/assistant-settings/update-question-limit";
import UpdateResponseLength from "@/ui/assistant-settings/update-response-length";
import LayoutLoader from "@/ui/layout/layout-loader";

export default function SettingsAISettingsPageClient() {
  const { settings, loading } = useAISettings();

  if (loading) return <LayoutLoader />;

  return (
    <div className="flex flex-col space-y-6">
      <UpdateContextWindow
        currentContextWindow={settings?.contextWindow || 0}
      />
      <UpdateHistoryRetention
        currentRetentionDays={settings?.historyRetentionDays || 0}
      />
      <UpdateCustomKnowledge
        currentKnowledgeIds={settings?.customKnowledgeIds || ""}
        useCustomKnowledge={settings?.useCustomKnowledge || false}
      />
      <UpdateFeatures
        enableCitations={settings?.enableCitations || false}
        enableFollowUp={settings?.enableFollowUp || false}
      />
      <UpdateLanguageStyle languageStyle={settings?.languageStyle || null} />
      <UpdateQuestionLimit
        maxQuestionsPerDay={settings?.maxQuestionsPerDay || null}
      />
      <UpdateResponseLength
        preferredResponseLength={settings?.preferredResponseLength || "concise"}
      />
    </div>
  );
}
