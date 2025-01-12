"use client";

import { BusinessConfig as platform } from "@dub/platform-config";
import { fetcher } from "@dub/utils";
import { useEffect } from "react";
import useSWR from "swr";

export const LinkToken = () => {
  const { error } = useSWR<{ token: number }>("/api/embed/token", fetcher, {
    revalidateOnFocus: true,
    dedupingInterval: 30000,
    keepPreviousData: true,
  });

  // Inform the parent if there's an error (Eg: token is expired)
  useEffect(() => {
    if (error) {
      window.parent.postMessage(
        {
          originator: platform.company,
          event: "ERROR",
          data: error.info,
        },
        "*",
      );
    }
  }, [error]);

  return null;
};
