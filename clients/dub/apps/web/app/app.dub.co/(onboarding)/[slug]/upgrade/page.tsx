import { Logo } from "@dub/ui";

import Link from "next/link";
import { PlanSelector } from "../../onboarding/(steps)/plan/plan-selector";
import { StepPage } from "../../onboarding/(steps)/step-page";
import ExitButton from "./exit-button";

export default function UpgradePage({ params }: { params: { slug: string } }) {
  return (
    <div className="relative flex flex-col items-center">
      <ExitButton />
      <Link href={`/${params.slug}`}>
        <Logo className="mt-6 h-8 w-8" />
      </Link>
      <div className="mt-8 flex w-full flex-col items-center px-3 pb-16 md:mt-20 lg:px-8">
        <StepPage
          title="Choose your plan"
          description="Find a plan that fits your needs"
          className="max-w-2xl"
        >
          <PlanSelector />
        </StepPage>
      </div>
    </div>
  );
}
