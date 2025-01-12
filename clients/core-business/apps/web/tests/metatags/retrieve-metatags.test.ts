import { expect, test } from "vitest";

import { MetaTag } from "@/lib/types";
import { BusinessConfig as platform } from "@dub/platform-config";
import { IntegrationHarness } from "../utils/integration";

test("GET /metatags", async (ctx) => {
  const h = new IntegrationHarness(ctx);
  const { http } = await h.init();

  const { status, data: metatags } = await http.get<MetaTag>({
    path: `/metatags`,
    query: {
      url: `${platform.webUrl}`,
    },
  });

  expect(status).toEqual(200);
  expect(metatags).toStrictEqual({
    title: `${platform.company} - Link Management for Modern Marketing Teams`,
    description:
      "Dub.co is the open-source link management platform for modern marketing teams to create marketing campaigns, link sharing features, and referral programs.",
    image: "https://assets.dub.co/thumbnail.jpg",
    poweredBy: `${platform.company} - Link management for modern marketing teams`,
  });
});
