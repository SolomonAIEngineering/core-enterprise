import { TransactionCategorySchema, getTransactionCategoriesQuerySchema } from "../zod/schemas/transaction-categories";

import { fetcher } from "@dub/utils";
import useSWR from "swr";
import useWorkspace from "./use-workspace";
import { z } from "zod";

const partialQuerySchema = getTransactionCategoriesQuerySchema.partial();

export type TransactionCategoryProps = z.infer<typeof TransactionCategorySchema>;

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
    } as Record<string, any>).toString()}`,
    fetcher,
    {
      dedupingInterval: 60000,
    },
  );

  return {
    categories,
    loading: categories ? false : true,
    isValidating,
  };
}
