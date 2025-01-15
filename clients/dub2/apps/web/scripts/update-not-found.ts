import "dotenv-flow/config";

import { BusinessConfig as platform } from "@dub/platform-config";
import { prisma } from "@dub/prisma";

async function main() {
  const domains = await prisma.domain.updateMany({
    where: {
      placeholder: `${platform.webUrl}/help/article/what-is-dub`,
    },
    data: {
      placeholder: null,
    },
  });

  console.log(domains);
}

main();
