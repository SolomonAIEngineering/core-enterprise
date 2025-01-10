import { DubApiError } from "@/lib/api/errors";
import { withSession } from "@/lib/auth";
import { UpdateAIAssistantSettingsSchema } from "@/lib/zod/schemas/ai-settings";
import { prisma } from "@dub/prisma";
import { NextResponse } from "next/server";

/**
 * GET /api/ai-settings/[id]
 *
 * Retrieves a specific AI Assistant Settings by ID
 */
export const GET = withSession(async ({ params }) => {
  try {
    const settings = await prisma.aIAssistantSettings.findUnique({
      where: {
        id: params.id,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    if (!settings) {
      throw new DubApiError({
        code: "not_found",
        message: "AI Assistant Settings not found",
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error in GET /api/ai-settings/[id]:", error);
    if (error instanceof DubApiError) throw error;

    throw new DubApiError({
      code: "internal_server_error",
      message: "Error retrieving AI Assistant Settings",
    });
  }
});

/**
 * PATCH /api/ai-settings/[id]
 *
 * Updates a specific AI Assistant Settings by ID
 */
export const PATCH = withSession(async ({ req, params }) => {
  try {
    const data = await UpdateAIAssistantSettingsSchema.parseAsync(
      await req.json(),
    );

    const settings = await prisma.aIAssistantSettings.update({
      where: {
        id: params.id,
      },
      data: {
        ...data,
        updatedAt: new Date(),
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error in PATCH /api/ai-settings/[id]:", error);

    if (error instanceof DubApiError) throw error;

    throw new DubApiError({
      code: "internal_server_error",
      message: "Error updating AI Assistant Settings",
    });
  }
});

/**
 * DELETE /api/ai-settings/[id]
 *
 * Deletes a specific AI Assistant Settings by ID
 */
export const DELETE = withSession(async ({ params }) => {
  try {
    await prisma.aIAssistantSettings.delete({
      where: {
        id: params.id,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error in DELETE /api/ai-settings/[id]:", error);

    if (error instanceof DubApiError) throw error;

    throw new DubApiError({
      code: "internal_server_error",
      message: "Error deleting AI Assistant Settings",
    });
  }
});
