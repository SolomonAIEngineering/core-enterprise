import { fetcher } from "@dub/utils";
import useSWR from "swr";
import type { AIAssistantSettings } from "../types";

/**
 * Hook for fetching the current user's AI Assistant Settings
 * @returns The AI Assistant Settings data and SWR states
 */
export function useAISettings() {
  const { data, error } = useSWR<AIAssistantSettings>(
    "/api/ai-settings",
    fetcher,
  );

  return {
    settings: data,
    loading: !error && !data,
    error,
  };
}
