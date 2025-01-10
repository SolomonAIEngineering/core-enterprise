import {
  CreateAIAssistantSettingsSchema,
  UpdateAIAssistantSettingsSchema,
} from "@/lib/zod/schemas/ai-settings";

import { DubApiError } from "@/lib/api/errors";
import { withSession } from "@/lib/auth";
import { prisma } from "@dub/prisma";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/ai-settings:
 *   get:
 *     summary: Get AI Assistant Settings
 *     description: Retrieves the AI Assistant Settings for the authenticated user
 *     responses:
 *       200:
 *         description: AI Assistant Settings retrieved successfully
 *       401:
 *         description: Unauthorized - User not authenticated
 *       500:
 *         description: Internal server error
 */

/**
 * GET /api/ai-settings
 *
 * Retrieves the AI Assistant Settings for the current user.
 * If no settings exist, creates default settings.
 */
export const GET = withSession(async ({ session }) => {
  try {
    let settings = await prisma.aIAssistantSettings.findUnique({
      where: {
        userId: session.user.id,
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

    // If no settings exist, create default settings
    if (!settings) {
      const defaultSettings = CreateAIAssistantSettingsSchema.parse({
        userId: session.user.id,
        historyRetentionDays: 30,
        enableCitations: true,
        enableFollowUp: true,
        contextWindow: 4,
        preferredResponseLength: "balanced",
        useCustomKnowledge: false,
        conversationCount: 0,
      });

      settings = await prisma.aIAssistantSettings.create({
        data: defaultSettings,
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
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error in GET /api/ai-settings:", error);
    throw new DubApiError({
      code: "internal_server_error",
      message: "Error retrieving AI Assistant Settings",
    });
  }
});

/**
 * @swagger
 * /api/ai-settings:
 *   patch:
 *     summary: Update AI Assistant Settings
 *     description: Updates the AI Assistant Settings for the authenticated user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AIAssistantSettingsUpdate'
 *     responses:
 *       200:
 *         description: Settings updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - User not authenticated
 *       500:
 *         description: Internal server error
 */
export const PATCH = withSession(async ({ req, session }) => {
  try {
    const data = await UpdateAIAssistantSettingsSchema.parseAsync(
      await req.json(),
    );

    const settings = await prisma.aIAssistantSettings.upsert({
      where: {
        userId: session.user.id,
      },
      update: {
        ...data,
        updatedAt: new Date(),
      },
      create: {
        ...CreateAIAssistantSettingsSchema.parse({
          ...data,
          userId: session.user.id,
          conversationCount: 0,
        }),
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
    console.error("Error in PATCH /api/ai-settings:", error);

    if (error instanceof DubApiError) throw error;

    throw new DubApiError({
      code: "internal_server_error",
      message: "Error updating AI Assistant Settings",
    });
  }
});

/**
 * @swagger
 * /api/ai-settings:
 *   delete:
 *     summary: Reset AI Assistant Settings
 *     description: Resets the AI Assistant Settings to default values
 *     responses:
 *       200:
 *         description: Settings reset successfully
 *       401:
 *         description: Unauthorized - User not authenticated
 *       500:
 *         description: Internal server error
 */
export const DELETE = withSession(async ({ session }) => {
  try {
    const defaultSettings = CreateAIAssistantSettingsSchema.parse({
      userId: session.user.id,
      historyRetentionDays: 30,
      enableCitations: true,
      enableFollowUp: true,
      contextWindow: 4,
      preferredResponseLength: "balanced",
      useCustomKnowledge: false,
      conversationCount: 0,
      languageStyle: null,
      customKnowledgeIds: null,
      maxQuestionsPerDay: null,
      lastConversationAt: null,
    });

    const settings = await prisma.aIAssistantSettings.upsert({
      where: {
        userId: session.user.id,
      },
      update: {
        ...defaultSettings,
        updatedAt: new Date(),
      },
      create: defaultSettings,
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
    console.error("Error in DELETE /api/ai-settings:", error);
    throw new DubApiError({
      code: "internal_server_error",
      message: "Error resetting AI Assistant Settings",
    });
  }
});

export const PUT = PATCH;
