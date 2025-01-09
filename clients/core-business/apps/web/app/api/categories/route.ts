import { DubApiError, exceededLimitError } from "@/lib/api/errors";
import {
  createTransactionCategoryBodySchema,
  getTransactionCategoriesQuerySchemaExtended,
} from "@/lib/zod/schemas/transaction-categories";

import { NextResponse } from "next/server";
import { createId } from "@/lib/api/utils";
import { prisma } from "@dub/prisma";
import { withWorkspace } from "@/lib/auth";

// GET /api/categories - get all categories for a workspace
export const GET = withWorkspace(
  async ({ workspace, headers, searchParams }) => {
    const { search, page, pageSize, includeTransactionsCount } =
      getTransactionCategoriesQuerySchemaExtended.parse(searchParams);

    const categories = await prisma.transactionCategory.findMany({
      where: {
        projectId: workspace.id,
        ...(search && {
          name: {
            contains: search,
          },
        }),
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        parentId: true,
        level: true,
        ...(includeTransactionsCount && {
          _count: {
            select: {
              transactions: true,
            },
          },
        }),
      },
      orderBy: {
        name: "asc",
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
    });

    return NextResponse.json(categories, { headers });
  },
  {
    requiredPermissions: ["workspaces.read"],
  },
);

// POST /api/categories - create a category for a workspace
export const POST = withWorkspace(
  async ({ req, workspace, headers }) => {
    const categoriesCount = await prisma.transactionCategory.count({
      where: {
        projectId: workspace.id,
      },
    });

    if (categoriesCount >= workspace.tagsLimit) {
      throw new DubApiError({
        code: "exceeded_limit",
        message: exceededLimitError({
          plan: workspace.plan,
          limit: workspace.tagsLimit,
          type: "tags",
        }),
      });
    }

    const { name, description, parentId } = createTransactionCategoryBodySchema.parse(await req.json());

    const existingCategory = await prisma.transactionCategory.findFirst({
      where: {
        projectId: workspace.id,
        name,
      },
    });

    if (existingCategory) {
      throw new DubApiError({
        code: "conflict",
        message: "A category with that name already exists.",
      });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const level = parentId ? await getParentLevel(parentId) + 1 : 0;

    const response = await prisma.transactionCategory.create({
      data: {
        id: createId({ prefix: "tag_" }),
        name,
        slug,
        description,
        parentId,
        level,
        projectId: workspace.id,
      },
    });

    return NextResponse.json(response, {
      headers,
      status: 201,
    });
  },
  {
    requiredPermissions: ["workspaces.write"],
  },
);

async function getParentLevel(parentId: string): Promise<number> {
  const parent = await prisma.transactionCategory.findUnique({
    where: { id: parentId },
    select: { level: true },
  });
  return parent?.level ?? -1;
}
