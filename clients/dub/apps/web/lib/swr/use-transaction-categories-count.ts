import { fetcher } from "@dub/utils";
import useSWR from "swr";
import type { z } from "zod";
import { getTransactionCategoriesCountQuerySchema } from "../zod/schemas/transaction-categories";
import useWorkspace from "./use-workspace";

const partialQuerySchema = getTransactionCategoriesCountQuerySchema.partial();

export default function useTransactionCategoriesCount({
  query,
}: { query?: z.infer<typeof partialQuerySchema> } = {}) {
  const { id } = useWorkspace();

  const { data, error } = useSWR<number>(
    id &&
      `/api/categories/count?${
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        new URLSearchParams({ workspaceId: id, ...query } as Record<
          string,
          any
        >).toString()
      }`,
    fetcher,
    {
      dedupingInterval: 60000,
    },
  );

  return {
    data,
    loading: !error && data === undefined,
    error,
  };
}
