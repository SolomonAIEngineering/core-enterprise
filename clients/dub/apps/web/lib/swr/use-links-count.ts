import { useEffect, useState } from "react";

import { useRouterStuff } from "@dub/ui";
import { fetcher } from "@dub/utils";
import useSWR from "swr";
import type z from "../zod";
import { getLinksCountQuerySchema } from "../zod/schemas/links";
import useWorkspace from "./use-workspace";

const partialQuerySchema = getLinksCountQuerySchema.partial();

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default function useLinksCount<T = any>(
  opts: z.infer<typeof partialQuerySchema> & { ignoreParams?: boolean } = {},
) {
  const { id: workspaceId } = useWorkspace();
  const { getQueryString } = useRouterStuff();

  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    if (window.location.host.startsWith("admin.")) {
      setAdmin(true);
    }
  }, []);

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const { data, error } = useSWR<any>(
    workspaceId
      ? `/api/links/count${
          opts.ignoreParams
            ? `?workspaceId=${workspaceId}`
            : getQueryString(
                Object.entries({
                  workspaceId,
                  domain: opts.domain,
                  tagId: opts.tagId,
                  tagIds: opts.tagIds?.join(","),
                  tagNames: opts.tagNames?.join(","),
                  search: opts.search,
                  userId: opts.userId,
                  showArchived: opts.showArchived,
                  withTags: opts.withTags,
                  groupBy: opts.groupBy,
                }).reduce(
                  (acc, [key, value]) => {
                    if (value !== undefined) {
                      acc[key] = value;
                    }
                    return acc;
                  },
                  {} as Record<string, string | number | boolean>,
                ),
                {
                  ignore: ["import", "upgrade", "newLink"],
                },
              )
        }`
      : admin
        ? `/api/admin/links/count${getQueryString(
            Object.entries({
              domain: opts.domain,
              tagId: opts.tagId,
              tagIds: opts.tagIds?.join(","),
              tagNames: opts.tagNames?.join(","),
              search: opts.search,
              userId: opts.userId,
              showArchived: opts.showArchived,
              withTags: opts.withTags,
              groupBy: opts.groupBy,
            }).reduce(
              (acc, [key, value]) => {
                if (value !== undefined) {
                  acc[key] = value;
                }
                return acc;
              },
              {} as Record<string, string | number | boolean>,
            ),
          )}`
        : null,
    fetcher,
    {
      dedupingInterval: 60000,
      keepPreviousData: true,
    },
  );

  return {
    data: data as T,
    loading: !error && data === undefined,
    error,
  };
}
