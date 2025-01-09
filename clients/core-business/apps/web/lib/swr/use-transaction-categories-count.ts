import { fetcher } from "@dub/utils";
import { getTransactionCategoriesCountQuerySchema } from "../zod/schemas/transaction-categories";
import useSWR from "swr";
import useWorkspace from "./use-workspace";
import { z } from "zod";

const partialQuerySchema = getTransactionCategoriesCountQuerySchema.partial();

export default function useTransactionCategoriesCount({
  query,
}: { query?: z.infer<typeof partialQuerySchema> } = {}) {
  const { id } = useWorkspace();

  const { data, error } = useSWR<number>(
    id &&
    `/api/categories/count?${new URLSearchParams({ workspaceId: id, ...query } as Record<string, any>).toString()}`,
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
