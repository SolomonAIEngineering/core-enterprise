import { CardList } from "@dub/ui";

export function TransactionCategoryCardPlaceholder() {
  return (
    <CardList.Card>
      <div className="flex items-center justify-between space-x-3 px-4 py-3">
        <div className="flex items-center space-x-3">
          <div className="flex flex-col space-y-2">
            {/* Category name and level badge */}
            <div className="flex items-center space-x-2">
              <div className="h-5 w-32 animate-pulse rounded-md bg-gray-200" />
              <div className="h-5 w-16 animate-pulse rounded-md bg-gray-100" /> {/* Level badge */}
            </div>
            {/* Description */}
            <div className="h-4 w-48 animate-pulse rounded-md bg-gray-200" />
            {/* Metadata row */}
            <div className="flex items-center space-x-2">
              <div className="h-4 w-20 animate-pulse rounded-md bg-gray-100" /> {/* Budget info */}
              <div className="h-4 w-24 animate-pulse rounded-md bg-gray-100" /> {/* Transaction count */}
            </div>
          </div>
        </div>
        {/* Action buttons */}
        <div className="flex items-center space-x-2">
          <div className="h-9 w-16 animate-pulse rounded-md bg-gray-200" /> {/* Edit button */}
          <div className="h-9 w-20 animate-pulse rounded-md bg-gray-200" /> {/* Archive button */}
        </div>
      </div>
    </CardList.Card>
  );
}
