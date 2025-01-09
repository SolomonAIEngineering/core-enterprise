import { cn, truncate } from "@dub/utils";

import { Tag } from "lucide-react";
import { useMediaQuery } from "@dub/ui";

// Define the color types based on transaction category types (income, expense, etc.)
export type TransactionCategoryColorProps =
  | "green"     // Green for income
  | "red"       // Red for expenses
  | "blue"      // Blue for transfers
  | "purple"    // Purple for tax related
  | "yellow"    // Yellow for financial transactions
  | "gray"      // Gray for adjustments
  | "orange"    // Orange for investments
  | "pink"      // Pink for subscriptions
  | "indigo"    // Indigo for savings
  | "teal"      // Teal for utilities
  | "cyan"      // Cyan for education
  | "lime"      // Lime for health
  | "emerald"   // Emerald for business
  | "rose"      // Rose for entertainment
  | "sky"       // Sky for travel
  | "amber"     // Amber for food & dining
  | "violet"    // Violet for shopping
  | "slate"     // Slate for miscellaneous
  | "other";    // Brown for others

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
        color === "green" && "border-green-300 bg-green-100 text-green-600",
        color === "red" && "border-red-300 bg-red-100 text-red-600",
        color === "blue" && "border-blue-300 bg-blue-100 text-blue-600",
        color === "purple" && "border-purple-300 bg-purple-100 text-purple-600",
        color === "yellow" && "border-yellow-300 bg-yellow-100 text-yellow-600",
        color === "gray" && "border-gray-300 bg-gray-100 text-gray-600",
        color === "orange" && "border-orange-300 bg-orange-100 text-orange-600",
        color === "pink" && "border-pink-300 bg-pink-100 text-pink-600",
        color === "indigo" && "border-indigo-300 bg-indigo-100 text-indigo-600",
        color === "teal" && "border-teal-300 bg-teal-100 text-teal-600",
        color === "cyan" && "border-cyan-300 bg-cyan-100 text-cyan-600",
        color === "lime" && "border-lime-300 bg-lime-100 text-lime-600",
        color === "emerald" && "border-emerald-300 bg-emerald-100 text-emerald-600",
        color === "rose" && "border-rose-300 bg-rose-100 text-rose-600",
        color === "sky" && "border-sky-300 bg-sky-100 text-sky-600",
        color === "amber" && "border-amber-300 bg-amber-100 text-amber-600",
        color === "violet" && "border-violet-300 bg-violet-100 text-violet-600",
        color === "slate" && "border-slate-300 bg-slate-100 text-slate-600",
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
  { color: "green", css: "bg-green-100 text-green-600" },
  { color: "red", css: "bg-red-100 text-red-600" },
  { color: "blue", css: "bg-blue-100 text-blue-600" },
  { color: "purple", css: "bg-purple-100 text-purple-600" },
  { color: "yellow", css: "bg-yellow-100 text-yellow-600" },
  { color: "orange", css: "bg-orange-100 text-orange-600" },
  { color: "pink", css: "bg-pink-100 text-pink-600" },
  { color: "indigo", css: "bg-indigo-100 text-indigo-600" },
  { color: "teal", css: "bg-teal-100 text-teal-600" },
  { color: "cyan", css: "bg-cyan-100 text-cyan-600" },
  { color: "lime", css: "bg-lime-100 text-lime-600" },
  { color: "emerald", css: "bg-emerald-100 text-emerald-600" },
  { color: "rose", css: "bg-rose-100 text-rose-600" },
  { color: "sky", css: "bg-sky-100 text-sky-600" },
  { color: "amber", css: "bg-amber-100 text-amber-600" },
  { color: "violet", css: "bg-violet-100 text-violet-600" },
  { color: "slate", css: "bg-slate-100 text-slate-600" },
  { color: "gray", css: "bg-gray-100 text-gray-600" },
  { color: "other", css: "bg-brown-100 text-brown-600" }
];

export function getDefaultCategoryColor(categoryTag?: string): TransactionCategoryColorProps {
  if (!categoryTag) return "other";

  if (categoryTag.startsWith("green")) return "green";
  if (categoryTag.startsWith("red")) return "red";
  if (categoryTag.startsWith("blue")) return "blue";
  if (categoryTag.startsWith("purple")) return "purple";
  if (categoryTag.startsWith("yellow")) return "yellow";
  if (categoryTag.startsWith("orange")) return "orange";
  if (categoryTag.startsWith("pink")) return "pink";
  if (categoryTag.startsWith("indigo")) return "indigo";
  if (categoryTag.startsWith("teal")) return "teal";
  if (categoryTag.startsWith("cyan")) return "cyan";
  if (categoryTag.startsWith("lime")) return "lime";
  if (categoryTag.startsWith("emerald")) return "emerald";
  if (categoryTag.startsWith("rose")) return "rose";
  if (categoryTag.startsWith("sky")) return "sky";
  if (categoryTag.startsWith("amber")) return "amber";
  if (categoryTag.startsWith("violet")) return "violet";
  if (categoryTag.startsWith("slate")) return "slate";
  if (categoryTag.startsWith("gray")) return "gray";

  return "other";
}

export function randomCategoryColor() {
  const randomIndex = Math.floor(Math.random() * CATEGORY_COLORS_LIST.length);
  return CATEGORY_COLORS_LIST[randomIndex].color;
}
