import { cn, truncate } from "@dub/utils";

import { Tag } from "lucide-react";
import { useMediaQuery } from "@dub/ui";

// Define the color types based on transaction category types (income, expense, etc.)
export type TransactionCategoryColorProps =
  | "income"     // Green for income
  | "expense"    // Red for expenses
  | "transfer"   // Blue for transfers
  | "tax"        // Purple for tax related
  | "finance"    // Yellow for financial transactions
  | "adjustment" // Gray for adjustments
  | "other";     // Brown for others

export default function TransactionCategoryBadge({
  name,
  color,
  withIcon,
  transactionCount,
  className,
}: {
  name?: string;
  color: TransactionCategoryColorProps;
  withIcon?: boolean;
  transactionCount?: number;
  className?: string;
}) {
  const { isDesktop } = useMediaQuery();

  return (
    <span
      className={cn(
        "my-auto block whitespace-nowrap rounded-md border px-2 py-0.5 text-sm",
        (withIcon || transactionCount) &&
        "flex items-center gap-x-1.5 p-1.5 sm:rounded-md sm:px-2 sm:py-0.5",
        color === "income" && "border-green-300 bg-green-100 text-green-600",
        color === "expense" && "border-red-300 bg-red-100 text-red-600",
        color === "transfer" && "border-blue-300 bg-blue-100 text-blue-600",
        color === "tax" && "border-purple-300 bg-purple-100 text-purple-600",
        color === "finance" && "border-yellow-300 bg-yellow-100 text-yellow-600",
        color === "adjustment" && "border-gray-300 bg-gray-100 text-gray-600",
        color === "other" && "border-brown-300 bg-brown-100 text-brown-600",
        className,
      )}
    >
      {withIcon && <Tag className="h-3 w-3 shrink-0" />}
      {name && (
        <p {...(withIcon && { className: "hidden sm:inline-block" })}>
          {truncate(name || "", !isDesktop ? 20 : 24)}
        </p>
      )}
      {!!transactionCount && (
        <span className="hidden sm:block">
          <span className="pr-1.5 opacity-30 md:pl-1 md:pr-2.5">|</span>
          {transactionCount}
        </span>
      )}
    </span>
  );
}

export const CATEGORY_COLORS_LIST: { color: TransactionCategoryColorProps; css: string }[] = [
  {
    color: "income",
    css: "bg-green-100 text-green-600",
  },
  {
    color: "expense",
    css: "bg-red-100 text-red-600",
  },
  {
    color: "transfer",
    css: "bg-blue-100 text-blue-600",
  },
  {
    color: "tax",
    css: "bg-purple-100 text-purple-600",
  },
  {
    color: "finance",
    css: "bg-yellow-100 text-yellow-600",
  },
  {
    color: "adjustment",
    css: "bg-gray-100 text-gray-600",
  },
  {
    color: "other",
    css: "bg-brown-100 text-brown-600",
  },
];

export function getDefaultCategoryColor(categoryTag?: string): TransactionCategoryColorProps {
  if (!categoryTag) return "other";

  if (categoryTag.startsWith("income_")) return "income";
  if (categoryTag.startsWith("expense_")) return "expense";
  if (categoryTag.startsWith("transfer_")) return "transfer";
  if (categoryTag.startsWith("tax_")) return "tax";
  if (categoryTag.startsWith("finance_")) return "finance";
  if (categoryTag.startsWith("adjustment_")) return "adjustment";

  return "other";
}

export function randomCategoryColor() {
  const randomIndex = Math.floor(Math.random() * CATEGORY_COLORS_LIST.length);
  return CATEGORY_COLORS_LIST[randomIndex].color;
}
