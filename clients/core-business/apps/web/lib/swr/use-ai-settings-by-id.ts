import { fetcher } from "@dub/utils";
import useSWR from "swr";
import { AIAssistantSettings } from "../types";

/**
 * Hook for fetching AI Assistant Settings by ID
 * @param id - The ID of the settings to fetch
 * @returns The AI Assistant Settings data and SWR states
 */
export function useAISettingsById(id?: string) {
  const { data, error } = useSWR<AIAssistantSettings>(
    id ? `/api/ai-settings/${id}` : null,
    fetcher,
  );

  return {
    settings: data,
    loading: !error && !data && id !== undefined,
    error,
  };
}
