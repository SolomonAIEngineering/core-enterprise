import { useRouter, useSearchParams } from "next/navigation";

import type { OnboardingStep } from "@/lib/onboarding/types";
import { setOnboardingProgress } from "@/lib/actions/set-onboarding-progress";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { useCallback } from "react";
import useWorkspace from "@/lib/swr/use-workspace";

const PRE_WORKSPACE_STEPS = ["workspace"];

export function useOnboardingProgress() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { slug: workspaceSlug } = useWorkspace();
  const slug = workspaceSlug || searchParams.get("workspace");

  const { execute, executeAsync, isExecuting, hasSucceeded } = useAction(
    setOnboardingProgress,
    {
      onSuccess: () => {
        console.log("Onboarding progress updated");
      },
      onError: ({ error }) => {
        toast.error("Failed to update onboarding progress. Please try again.");
        console.error("Failed to update onboarding progress", error);
      },
    },
  );

  const continueTo = useCallback(
    async (
      step: OnboardingStep,
      { slug: providedSlug }: { slug?: string } = {},
    ) => {
      execute({
        onboardingStep: step,
      });

      const queryParams = PRE_WORKSPACE_STEPS.includes(step)
        ? ""
        : `?workspace=${providedSlug || slug}`;
      router.push(`/onboarding/${step}${queryParams}`);
    },
    [execute, router, slug],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const finish = useCallback(async () => {
    await executeAsync({
      onboardingStep: "completed",
    });

    router.push(slug ? `/${slug}?onboarded=true` : "/");
  }, [execute, router, slug]);

  return {
    continueTo,
    finish,
    isLoading: isExecuting,
    isSuccessful: hasSucceeded,
  };
}
