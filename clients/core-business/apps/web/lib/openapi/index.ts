import { openApiErrorResponses } from "@/lib/openapi/responses";
import { DomainSchema } from "@/lib/zod/schemas/domains";
import { LinkSchema } from "@/lib/zod/schemas/links";
import { TagSchema } from "@/lib/zod/schemas/tags";
import { WorkspaceSchema } from "@/lib/zod/schemas/workspaces";
import { BusinessConfig as platform } from "@dub/platform-config";
import { createDocument } from "zod-openapi";
import { webhookEventSchema } from "../webhook/schemas";
import { analyticsPath } from "./analytics";
import { customersPaths } from "./customers";
import { domainsPaths } from "./domains";
import { eventsPath } from "./events";
import { linksPaths } from "./links";
import { metatagsPath } from "./metatags";
import { qrCodePaths } from "./qr";
import { tagsPaths } from "./tags";
import { tokensPaths } from "./tokens";
import { trackPaths } from "./track";
import { workspacesPaths } from "./workspaces";

export const document = createDocument({
  openapi: "3.0.3",
  info: {
    title: `${platform.company} API`,
    description: platform.description,
    version: "0.0.1",
    contact: {
      name: `${platform.company} Support`,
      email: platform.supportEmail,
      url: `${platform.webUrl}/api`,
    },
  },
  servers: [
    {
      url: `${platform.apiUrl}`,
      description: "Production API",
    },
  ],
  paths: {
    ...linksPaths,
    ...analyticsPath,
    ...eventsPath,
    ...tagsPaths,
    ...domainsPaths,
    ...trackPaths,
    ...customersPaths,
    ...workspacesPaths,
    ...tokensPaths,
    ...qrCodePaths,
    ...metatagsPath,
  },
  components: {
    schemas: {
      LinkSchema,
      WorkspaceSchema,
      TagSchema,
      DomainSchema,
      webhookEventSchema,
    },
    securitySchemes: {
      token: {
        type: "http",
        description: "Default authentication mechanism",
        scheme: "bearer",
        "x-speakeasy-example": "VECTOR_API_KEY",
      },
    },
    responses: {
      ...openApiErrorResponses,
    },
  },
});
