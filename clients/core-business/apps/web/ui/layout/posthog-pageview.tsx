import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { usePostHog } from "posthog-js/react";

export function PosthogPageview() {
  return (
    <Suspense>
      <PosthogPageviewClient />
    </Suspense>
  );
}

const PosthogPageviewClient = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();
  useEffect(() => {
    // Track pageviews
    if (pathname && posthog) {
      let url = window.origin + pathname;
      if (searchParams.toString()) {
        url = `${url}?${searchParams.toString()}`;
      }
      posthog.capture("$pageview", {
        $current_url: url,
      });
    }
  }, [pathname, searchParams, posthog]);

  return null;
};
