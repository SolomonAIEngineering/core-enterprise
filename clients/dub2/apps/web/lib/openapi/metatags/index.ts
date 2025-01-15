import { ZodOpenApiOperationObject, ZodOpenApiPathsObject } from "zod-openapi";

import z from "@/lib/zod";
import { getUrlQuerySchema } from "@/lib/zod/schemas/links";
import { metaTagsSchema } from "@/lib/zod/schemas/metatags";
import { BusinessConfig as platform } from "@dub/platform-config";

const getMetatags: ZodOpenApiOperationObject = {
  operationId: "getMetatags",
  "x-speakeasy-name-override": "get",
  summary: "Retrieve the metatags for a URL",
  description: "Retrieve the metatags for a URL.",
  requestParams: {
    query: getUrlQuerySchema.merge(
      z.object({
        url: z.string().openapi({
          example: `${platform.webUrl}/`,
          description: "The URL to retrieve metatags for.",
        }),
      }),
    ),
  },
  responses: {
    "200": {
      description: "The retrieved metatags",
      content: {
        "application/json": {
          schema: metaTagsSchema,
        },
      },
    },
  },
  tags: ["Metatags"],
};

export const metatagsPath: ZodOpenApiPathsObject = {
  "/metatags": {
    get: getMetatags,
  },
};