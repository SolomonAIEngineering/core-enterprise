import { NextResponse } from "next/server";
import { prisma } from "@dub/prisma";
import { withWorkspace } from "@/lib/auth";
import { z } from "zod";

const getCategoriesCountQuerySchema = z.object({
  search: z.string().optional(),
});

// GET /api/categories/count - get count of categories for a workspace
export const GET = withWorkspace(
  async ({ workspace, headers, searchParams }) => {
    const { search } = getCategoriesCountQuerySchema.parse(searchParams);

    const count = await prisma.transactionCategory.count({
      where: {
        projectId: workspace.id,
        ...(search && {
          name: {
            contains: search,
          },
        }),
      },
    });

    return NextResponse.json(count, { headers });
  },
  {
    requiredPermissions: ["workspaces.read"],
  },
);
