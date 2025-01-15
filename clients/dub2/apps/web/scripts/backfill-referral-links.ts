import "dotenv-flow/config";

import { dub } from "@/lib/dub";
import { BusinessConfig as platform } from "@dub/platform-config";
import { prisma } from "@dub/prisma";

async function main() {
  const workspaces = await prisma.project
    .findMany({
      where: {
        slug: {
          in: ["dub", "steven", "acme"],
        },
      },
      select: {
        id: true,
        slug: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    })
    .then((workspaces) =>
      workspaces.map((workspace) => ({
        id: `ws_${workspace.id}`,
        slug: workspace.slug,
      })),
    );

  console.table(workspaces.slice(0, 10));

  const res = await dub.links.createMany(
    workspaces.map((workspace) => ({
      domain: `refer.${platform.domain}`,
      key: workspace.slug,
      url: `${platform.webUrl}`,
      externalId: `ws_${workspace.id}`, // attaching the workspace ID as the externalId for easy updates later on: https://d.to/externalId
      tagIds: ["cm000srqx0004o6ldehod07zc"], // tagging these links with the "Referral links" tag
      trackConversion: true, // enable conversion tracking for these links
    })),
  );

  console.log(res);
}

main();
