import { Suspense } from "react";
import WorkspaceTransactionCategoriesClient from "./page-client";

export default function WorkspaceTransactionCategories() {
  return (
    <Suspense>
      <WorkspaceTransactionCategoriesClient />
    </Suspense>
  );
}
