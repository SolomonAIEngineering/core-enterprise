import {
  type TransactionCategorySchema,
  getTransactionCategoriesQuerySchema,
} from "../zod/schemas/transaction-categories";

import { fetcher } from "@dub/utils";
import useSWR from "swr";
import type { z } from "zod";
import useWorkspace from "./use-workspace";

const partialQuerySchema = getTransactionCategoriesQuerySchema.partial();

export type TransactionCategoryProps = z.infer<
  typeof TransactionCategorySchema
>;

export default function useTransactionCategories({
  query,
  enabled = true,
  includeTransactionsCount = false,
}: {
  query?: z.infer<typeof partialQuerySchema>;
  enabled?: boolean;
  includeTransactionsCount?: boolean;
} = {}) {
  const { id } = useWorkspace();

  const { data: categories, isValidating } = useSWR<TransactionCategoryProps[]>(
    id &&
      enabled &&
      `/api/categories?${new URLSearchParams({
        workspaceId: id,
        ...query,
        includeTransactionsCount,
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      } as Record<string, any>).toString()}`,
    fetcher,
    {
      dedupingInterval: 60000,
    },
  );

  return {
    categories,
    loading: !categories,
    isValidating,
  };
}
