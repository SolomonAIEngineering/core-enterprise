"use client";

import {
  CardList,
  PaginationControls,
  usePagination,
  useRouterStuff,
} from "@dub/ui";
import { Dispatch, SetStateAction, createContext, useState } from "react";

import useTransactionCategories from "@/lib/swr/use-transaction-categories";
import useTransactionCategoriesCount from "@/lib/swr/use-transaction-categories-count";
import { TRANSACTION_CATEGORIES_MAX_PAGE_SIZE } from "@/lib/zod/schemas/transaction-categories";
import { useAddEditTransactionCategoryModal } from "@/ui/modals/add-edit-transaction-category-modal";
import { AnimatedEmptyState } from "@/ui/shared/animated-empty-state";
import { SearchBoxPersisted } from "@/ui/shared/search-box";
import { BusinessConfig as platform } from "@dub/platform-config";
import { Tag } from "@dub/ui/icons";
import { TransactionCategoryCard } from "./transaction-category-card";
import { TransactionCategoryCardPlaceholder } from "./transaction-category-card-placeholder";

export const TransactionCategoriesListContext = createContext<{
  openMenuCategoryId: string | null;
  setOpenMenuCategoryId: Dispatch<SetStateAction<string | null>>;
}>({
  openMenuCategoryId: null,
  setOpenMenuCategoryId: () => {},
});

export default function WorkspaceTransactionCategoriesClient() {
  const { searchParams, queryParams } = useRouterStuff();

  const { AddEditTransactionCategoryModal, AddTransactionCategoryButton } =
    useAddEditTransactionCategoryModal();

  const search = searchParams.get("search");
  const { pagination, setPagination } = usePagination(
    TRANSACTION_CATEGORIES_MAX_PAGE_SIZE,
  );

  const { categories, loading } = useTransactionCategories({
    query: {
      search: search ?? "",
      page: pagination.pageIndex,
    },
    includeTransactionsCount: true,
  });
  const { data: categoriesCount } = useTransactionCategoriesCount({
    query: { search: search ?? "" },
  });

  const [openMenuCategoryId, setOpenMenuCategoryId] = useState<string | null>(
    null,
  );

  return (
    <>
      <AddEditTransactionCategoryModal />
      <div className="grid gap-4 pb-10">
        <div className="flex w-full flex-wrap items-center justify-between gap-3 sm:w-auto">
          <SearchBoxPersisted
            loading={loading}
            onChangeDebounced={(t) => {
              if (t) {
                queryParams({ set: { search: t }, del: "page" });
              } else {
                queryParams({ del: "search" });
              }
            }}
          />
          <AddTransactionCategoryButton />
        </div>

        {!loading && categories?.length === 0 ? (
          <AnimatedEmptyState
            title="No categories found"
            description="Create categories to organize your transactions"
            cardContent={
              <>
                <div className="flex size-7 items-center justify-center rounded-md border border-neutral-200 bg-neutral-50">
                  <Tag className="size-4 text-neutral-700" />
                </div>
                <div className="h-2.5 w-28 min-w-0 rounded-sm bg-neutral-200" />
              </>
            }
            addButton={<AddTransactionCategoryButton />}
            learnMoreHref={`${platform.webUrl}/help/article/how-to-use-categories`}
          />
        ) : (
          <>
            <TransactionCategoriesListContext.Provider
              value={{ openMenuCategoryId, setOpenMenuCategoryId }}
            >
              <CardList variant="compact" loading={loading}>
                {categories?.length
                  ? categories.map((category) => (
                      <TransactionCategoryCard
                        key={category.id}
                        category={category}
                      />
                    ))
                  : Array.from({ length: 6 }).map((_, idx) => (
                      <TransactionCategoryCardPlaceholder key={idx} />
                    ))}
              </CardList>
            </TransactionCategoriesListContext.Provider>
            <div className="sticky bottom-0 rounded-b-[inherit] border-t border-gray-200 bg-white px-3.5 py-2">
              <PaginationControls
                pagination={pagination}
                setPagination={setPagination}
                totalCount={categoriesCount || 0}
                unit={(p) => `categorie${p ? "s" : ""}`}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
