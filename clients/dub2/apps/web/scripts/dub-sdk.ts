import "dotenv-flow/config";

import { dub } from "@/lib/dub";

async function main() {
  const data = await dub.analytics.retrieve({
    event: "clicks",
    groupBy: "triggers",
    interval: "30d",
  });
  console.log({ data });
}

main();
