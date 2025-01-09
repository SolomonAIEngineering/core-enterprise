"use client";

import {
  Button,
  CardList,
  Popover,
  useCopyToClipboard,
  useKeyboardShortcut,
} from "@dub/ui";
import { CircleCheck, Copy, LoadingSpinner, PenWriting } from "@dub/ui/icons";
import { Delete, ThreeDots } from "@/ui/shared/icons";
import TransactionCategoryBadge, { TransactionCategoryColorProps } from "@/ui/transactions/transaction-category-badge";
import { cn, nFormatter, pluralize } from "@dub/utils";
import { useContext, useState } from "react";

import Link from "next/link";
import TagBadge from "@/ui/links/tag-badge";
import { TagProps } from "@/lib/types";
import { TransactionCategoriesListContext } from "./page-client";
import { TransactionCategoryProps } from "@/lib/swr/use-transaction-categories";
import { mutatePrefix } from "@/lib/swr/mutate";
import { toast } from "sonner";
import { useAddEditTagModal } from "@/ui/modals/add-edit-tag-modal";
import { useAddEditTransactionCategoryModal } from "@/ui/modals/add-edit-transaction-category-modal";
import useWorkspace from "@/lib/swr/use-workspace";

export function TransactionCategoryCard({
  category,
}: {
  category: TransactionCategoryProps & { _count?: { links: number } };
}) {
  const { id, slug } = useWorkspace();

  const linksCount = category._count?.links;

  const { openMenuCategoryId, setOpenMenuCategoryId } = useContext(TransactionCategoriesListContext);
  const openPopover = openMenuCategoryId === category.id;
  const setOpenPopover = (open: boolean) => {
    setOpenMenuCategoryId(open ? category.id : null);
  };

  const [processing, setProcessing] = useState(false);

  const { AddEditTransactionCategoryModal, setShowAddEditCategoryModal } = useAddEditTransactionCategoryModal({
    props: category,
  });

  const [copiedTagId, copyToClipboard] = useCopyToClipboard();

  const copyTagId = () => {
    toast.promise(copyToClipboard(category.id), {
      success: "Tag ID copied!",
    });
  };

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this tag? All tagged links will be untagged, but they won't be deleted.",
      )
    )
      return;

    setProcessing(true);
    fetch(`/api/categories/${category.id}?workspaceId=${id}`, {
      method: "DELETE",
    })
      .then(async (res) => {
        if (res.ok) {
          await Promise.all([
            mutatePrefix("/api/categories"),
            mutatePrefix("/api/links"),
          ]);
          toast.success("Tag deleted");
        } else {
          const { error } = await res.json();
          toast.error(error.message);
        }
      })
      .finally(() => setProcessing(false));
  };

  return (
    <>
      <AddEditTransactionCategoryModal />

      <CardList.Card
        key={category.id}
        onClick={() => setShowAddEditCategoryModal(true)}
        innerClassName={cn(
          "flex items-center justify-between gap-5 sm:gap-8 md:gap-12 text-sm transition-opacity",
          processing && "opacity-50",
        )}
      >
        <div className="flex min-w-0 grow items-center gap-3">
          <TransactionCategoryBadge color={category.color as TransactionCategoryColorProps} withIcon className="sm:p-1.5" />
          <span className="min-w-0 truncate whitespace-nowrap text-gray-800">
            {category.name}
          </span>
        </div>

        <div className="flex items-center gap-5 sm:gap-8 md:gap-12">
          {linksCount !== undefined && (
            <Link
              href={`/${slug}?categoryIds=${category.id}`}
              className="whitespace-nowrap rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-sm text-gray-800 transition-colors hover:bg-gray-100"
            >
              {nFormatter(linksCount || 0)} {pluralize("link", linksCount || 0)}
            </Link>
          )}
          <Popover
            content={
              <div className="grid w-full gap-px p-2 sm:w-48">
                <Button
                  text="Edit"
                  variant="outline"
                  onClick={() => {
                    setOpenPopover(false);
                    setShowAddEditCategoryModal(true);
                  }}
                  icon={<PenWriting className="h-4 w-4" />}
                  shortcut="E"
                  className="h-9 px-2 font-medium"
                />
                <Button
                  text="Copy Tag ID"
                  variant="outline"
                  onClick={() => copyTagId()}
                  icon={
                    copiedTagId ? (
                      <CircleCheck className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )
                  }
                  shortcut="I"
                  className="h-9 px-2 font-medium"
                />
                <Button
                  text="Delete"
                  variant="danger-outline"
                  onClick={handleDelete}
                  icon={<Delete className="h-4 w-4" />}
                  shortcut="X"
                  className="h-9 px-2 font-medium"
                />
              </div>
            }
            align="end"
            openPopover={openPopover}
            setOpenPopover={setOpenPopover}
          >
            <Button
              variant="secondary"
              className={cn(
                "h-8 px-1.5 outline-none transition-all duration-200",
                "border-transparent data-[state=open]:border-gray-500 sm:group-hover/card:data-[state=closed]:border-gray-200",
              )}
              icon={
                processing ? (
                  <LoadingSpinner className="h-5 w-5 shrink-0" />
                ) : (
                  <ThreeDots className="h-5 w-5 shrink-0" />
                )
              }
              onClick={() => {
                setOpenPopover(!openPopover);
              }}
            />
          </Popover>
        </div>

        {/* Use consumer + separate component to use hovered state from CardList.Card context */}
        <CardList.Card.Context.Consumer>
          {({ hovered }) => (
            <TagCardKeyboardShortcuts
              enabled={openPopover || (hovered && openMenuCategoryId === null)}
              onKeyDown={(e) => {
                setOpenPopover(false);
                switch (e.key) {
                  case "e":
                    setShowAddEditCategoryModal(true);
                    break;
                  case "i":
                    copyTagId();
                    break;
                  case "x":
                    handleDelete();
                    break;
                }
              }}
            />
          )}
        </CardList.Card.Context.Consumer>
      </CardList.Card>
    </>
  );
}
function TagCardKeyboardShortcuts({
  enabled,
  onKeyDown,
}: {
  enabled: boolean;
  onKeyDown: (e: KeyboardEvent) => void;
}) {
  useKeyboardShortcut(["e", "i", "x"], onKeyDown, {
    enabled,
  });

  return null;
}

