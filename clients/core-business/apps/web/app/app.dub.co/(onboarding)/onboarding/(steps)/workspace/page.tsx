import { BusinessConfig as platform } from "@dub/platform-config";
import { GridPlus } from "@dub/ui/icons";
import { StepPage } from "../step-page";
import { Form } from "./form";

export default function Workspace() {
  return (
    <StepPage
      icon={GridPlus}
      title="Create a workspace"
      description={
        <a
          href={`${platform.webUrl}/help/article/what-is-a-workspace`}
          target="_blank"
          className="underline transition-colors hover:text-gray-700"
        >
          What is a workspace?
        </a>
      }
    >
      <Form />
    </StepPage>
  );
}
