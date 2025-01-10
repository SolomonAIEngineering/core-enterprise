import { useEffect, useState } from "react";
import useSWR, { SWRConfiguration } from "swr";
import { ExpandedLinkProps, UserProps } from "../types";

import { useRouterStuff } from "@dub/ui";
import { fetcher } from "@dub/utils";
import { z } from "zod";
import { getLinksQuerySchemaExtended } from "../zod/schemas/links";
import useWorkspace from "./use-workspace";

const partialQuerySchema = getLinksQuerySchemaExtended.partial();

export default function useLinks(
  opts: z.infer<typeof partialQuerySchema> = {},
  swrOpts: SWRConfiguration = {},
) {
  const { id: workspaceId } = useWorkspace();
  const { getQueryString } = useRouterStuff();

  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    if (window.location.host.startsWith("admin.")) {
      setAdmin(true);
    }
  }, []);

  const { data: links, isValidating } = useSWR<
    (ExpandedLinkProps & {
      user: UserProps;
    })[]
  >(
    workspaceId
      ? `/api/links${getQueryString(
          Object.entries({
            workspaceId,
            includeUser: "true",
            includeWebhooks: "true",
            includeDashboard: "true",
            domain: opts.domain,
            tagId: opts.tagId,
            userId: opts.userId,
            search: opts.search,
            sort: opts.sort,
            showArchived: opts.showArchived,
            withTags: opts.withTags,
            tagIds: opts.tagIds?.join(","),
            tagNames: opts.tagNames?.join(","),
            linkIds: opts.linkIds?.join(","),
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
        )}`
      : admin
        ? `/api/admin/links${getQueryString(
            Object.entries({
              domain: opts.domain,
              tagId: opts.tagId,
              userId: opts.userId,
              search: opts.search,
              sort: opts.sort,
              showArchived: opts.showArchived,
              withTags: opts.withTags,
              tagIds: opts.tagIds?.join(","),
              tagNames: opts.tagNames?.join(","),
              linkIds: opts.linkIds?.join(","),
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
      dedupingInterval: 20000,
      revalidateOnFocus: false,
      keepPreviousData: true,
      ...swrOpts,
    },
  );

  return {
    links,
    isValidating,
  };
}
