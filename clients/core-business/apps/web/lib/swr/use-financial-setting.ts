import { FinancialSettings } from "../zod/schemas/financial-settings";
import { fetcher } from "@dub/utils";
import useSWR from "swr";

/**
 * Hook for fetching the current user's Financial Settings
 * @returns The Financial Settings data and SWR states
 */
export function useFinancialSettings() {
  const { data, error } = useSWR<FinancialSettings>("/api/financial-settings", fetcher);

  return {
    settings: data,
    loading: !error && !data,
    error,
  };
}

/**
 * Hook for fetching Financial Settings by ID
 * @param id - The ID of the settings to fetch
 * @returns The Financial Settings data and SWR states
 */
export function useFinancialSettingsById(id?: string) {
  const { data, error } = useSWR<FinancialSettings>(
    id ? `/api/financial-settings/${id}` : null,
    fetcher
  );

  return {
    settings: data,
    loading: !error && !data && id !== undefined,
    error,
  };
}
