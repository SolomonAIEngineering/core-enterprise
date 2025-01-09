import { z } from "zod";

/**
 * Schema for the preferred response length in AI Assistant Settings
 */
export const PreferredResponseLengthSchema = z.enum(["concise", "balanced", "detailed"]);
export type PreferredResponseLength = z.infer<typeof PreferredResponseLengthSchema>;

/**
 * Base schema for AI Assistant Settings
 */
export const AIAssistantSettingsSchema = z.object({
  historyRetentionDays: z.number().min(1).max(365).default(30),
  maxQuestionsPerDay: z.number().min(1).nullable().optional(),
  enableCitations: z.boolean().default(true),
  enableFollowUp: z.boolean().default(true),
  contextWindow: z.number().min(1).max(10).default(4),
  preferredResponseLength: PreferredResponseLengthSchema.default("balanced"),
  languageStyle: z.string().nullable().optional(),
  useCustomKnowledge: z.boolean().default(false),
  customKnowledgeIds: z.string().nullable().optional(),
  conversationCount: z.number().optional(),
  lastConversationAt: z.date().nullable().optional(),
});

/**
 * Schema for creating new AI Assistant Settings
 */
export const CreateAIAssistantSettingsSchema = AIAssistantSettingsSchema.extend({
  userId: z.string(),
});

/**
 * Schema for updating existing AI Assistant Settings
 */
export const UpdateAIAssistantSettingsSchema = AIAssistantSettingsSchema.partial();

export type AIAssistantSettings = z.infer<typeof AIAssistantSettingsSchema>;
export type CreateAIAssistantSettings = z.infer<typeof CreateAIAssistantSettingsSchema>;
export type UpdateAIAssistantSettings = z.infer<typeof UpdateAIAssistantSettingsSchema>;
