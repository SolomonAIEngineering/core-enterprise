import { useRouterStuff } from "@dub/ui";
import { fetcher } from "@dub/utils";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { SalesCount } from "../types";
import z from "../zod";
import { getSalesCountQuerySchema } from "../zod/schemas/partners";
import useWorkspace from "./use-workspace";

export default function useSalesCount(
  opts?: z.infer<typeof getSalesCountQuerySchema>,
) {
  const { programId } = useParams();
  const { id: workspaceId } = useWorkspace() as { id: string };
  const { getQueryString } = useRouterStuff();

  const { data: salesCount, error } = useSWR<SalesCount>(
    `/api/programs/${programId}/sales/count${getQueryString(
      Object.entries({
        workspaceId,
        interval: opts?.interval,
        status: opts?.status,
        partnerId: opts?.partnerId,
        customerId: opts?.customerId,
        payoutId: opts?.payoutId,
        start: opts?.start?.toISOString(),
        end: opts?.end?.toISOString(),
      }).reduce(
        (acc, [key, value]) => {
          if (value !== undefined) {
            acc[key] = value;
          }
          return acc;
        },
        {} as Record<string, string | number | boolean>,
      ),
    )}`,
    fetcher,
  );

  return {
    salesCount,
    error,
  };
}
