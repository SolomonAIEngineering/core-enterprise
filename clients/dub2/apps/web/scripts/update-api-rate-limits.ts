import "dotenv-flow/config";

import { prisma } from "@dub/prisma";
import { getCurrentPlan } from "@dub/utils";

async function main() {
  const tokens = await prisma.restrictedToken.findMany({
    select: {
      id: true,
      project: {
        select: {
          plan: true,
        },
      },
    },
    take: 500,
  });

  for (const token of tokens) {
    const plan = getCurrentPlan(token.project.plan);

    await prisma.restrictedToken.update({
      where: {
        id: token.id,
      },
      data: {
        rateLimit: plan.limits.apis,
      },
    });
  }
}

main();
