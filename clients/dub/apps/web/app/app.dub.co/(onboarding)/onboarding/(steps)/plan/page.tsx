import { LaterButton } from "../../later-button";
import { StepPage } from "../step-page";
import { PlanSelector } from "./plan-selector";

export default function Plan() {
  return (
    <StepPage
      title="Choose your plan"
      description="Find a plan that fits your needs"
      className="max-w-2xl"
    >
      <PlanSelector />
      <div className="mt-8 flex flex-col gap-3">
        <LaterButton next="finish">I&apos;ll pick a plan later</LaterButton>
      </div>
    </StepPage>
  );
}
