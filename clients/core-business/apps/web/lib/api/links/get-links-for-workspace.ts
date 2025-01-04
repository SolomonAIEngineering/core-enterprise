import z from "@/lib/zod";
import { getLinksQuerySchemaExtended } from "@/lib/zod/schemas/links";
import { prisma } from "@dub/prisma";
import { combineTagIds } from "../tags/combine-tag-ids";
import { transformLink } from "./utils";

export async function getLinksForWorkspace({
  workspaceId,
  domain,
  tagId,
  tagIds,
  tagNames,
  search,
  sort = "createdAt",
  page,
  pageSize,
  userId,
  showArchived,
  withTags,
  includeUser,
  includeWebhooks,
  includeDashboard,
  linkIds,
}: z.infer<typeof getLinksQuerySchemaExtended> & {
  workspaceId: string;
}) {
  const combinedTagIds = combineTagIds({ tagId, tagIds });

  const links = await prisma.link.findMany({
    where: {
      projectId: workspaceId,
      archived: showArchived ? undefined : false,
      ...(domain && { domain }),
      ...(search && {
        OR: [
          {
            shortLink: { contains: search },
          },
          {
            url: { contains: search },
          },
        ],
      }),
      ...(withTags && {
        tags: {
          some: {},
        },
      }),
      ...(combinedTagIds && combinedTagIds.length > 0
        ? {
            tags: { some: { tagId: { in: combinedTagIds } } },
          }
        : tagNames
          ? {
              tags: {
                some: {
                  tag: {
                    name: {
                      in: tagNames,
                    },
                  },
                },
              },
            }
          : {}),
      ...(userId && { userId }),
      ...(linkIds && { id: { in: linkIds } }),
    },
    include: {
      tags: {
        include: {
          tag: {
            select: {
              id: true,
              name: true,
              color: true,
            },
          },
        },
      },
      user: includeUser,
      webhooks: includeWebhooks,
      dashboard: includeDashboard,
    },
    orderBy: {
      [sort]: "desc",
    },
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  return links.map((link) => transformLink(link));
}
