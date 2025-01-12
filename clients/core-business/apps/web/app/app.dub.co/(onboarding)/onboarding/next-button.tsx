"use client";

import { Button, ButtonProps } from "@dub/ui";

import { OnboardingStep } from "@/lib/onboarding/types";
import { useOnboardingProgress } from "./use-onboarding-progress";

export function NextButton({
  step,
  ...rest
}: { step: OnboardingStep } & ButtonProps) {
  const { continueTo, isLoading, isSuccessful } = useOnboardingProgress();

  return (
    <Button
      variant="primary"
      text="Next"
      className="bg-primary text-secondary rounded-2xl border"
      onClick={() => continueTo(step)}
      loading={isLoading || isSuccessful}
      {...rest}
    />
  );
}
