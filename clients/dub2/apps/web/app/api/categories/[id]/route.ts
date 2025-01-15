import { DubApiError } from "@/lib/api/errors";
import { withWorkspace } from "@/lib/auth";
import { prisma } from "@dub/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const updateCategoryBodySchema = z.object({
  name: z.string().min(1).max(50).optional(),
  description: z.string().optional(),
});

// GET /api/categories/[id] - get a specific category
export const GET = withWorkspace(
  async ({ params, workspace, headers }) => {
    const category = await prisma.transactionCategory.findFirst({
      where: {
        id: params.id,
        projectId: workspace.id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        _count: {
          select: {
            transactions: true,
          },
        },
      },
    });

    if (!category) {
      throw new DubApiError({
        code: "not_found",
        message: "Category not found.",
      });
    }

    return NextResponse.json(category, { headers });
  },
  {
    requiredPermissions: ["workspaces.read"],
  },
);

// PUT /api/categories/[id] - update a category
export const PUT = withWorkspace(
  async ({ req, params, workspace, headers }) => {
    const { name, description } = updateCategoryBodySchema.parse(
      await req.json(),
    );

    const existingCategory = await prisma.transactionCategory.findFirst({
      where: {
        id: params.id,
        projectId: workspace.id,
      },
    });

    if (!existingCategory) {
      throw new DubApiError({
        code: "not_found",
        message: "Category not found.",
      });
    }

    if (name) {
      const duplicateCategory = await prisma.transactionCategory.findFirst({
        where: {
          projectId: workspace.id,
          name,
          id: { not: params.id },
        },
      });

      if (duplicateCategory) {
        throw new DubApiError({
          code: "conflict",
          message: "A category with that name already exists.",
        });
      }
    }

    const response = await prisma.transactionCategory.update({
      where: {
        id: params.id,
      },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
      },
    });

    return NextResponse.json(response, { headers });
  },
  {
    requiredPermissions: ["workspaces.write"],
  },
);

// DELETE /api/categories/[id] - delete a category
export const DELETE = withWorkspace(
  async ({ params, workspace, headers }) => {
    const category = await prisma.transactionCategory.findFirst({
      where: {
        id: params.id,
        projectId: workspace.id,
      },
    });

    if (!category) {
      throw new DubApiError({
        code: "not_found",
        message: "Category not found.",
      });
    }

    await prisma.transactionCategory.delete({
      where: {
        id: params.id,
      },
    });

    return new NextResponse(null, { headers, status: 204 });
  },
  {
    requiredPermissions: ["workspaces.write"],
  },
);
