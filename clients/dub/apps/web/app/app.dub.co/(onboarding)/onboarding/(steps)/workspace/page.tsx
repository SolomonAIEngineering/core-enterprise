import WorkspaceTooltip from "@/ui/tooltip/workspace-tooltip";
import { GridPlus } from "@dub/ui/icons";
import { StepPage } from "../step-page";
import { Form } from "./form";
export default function Workspace() {
  return (
    <StepPage
      icon={GridPlus}
      title="Create a workspace"
      description={<WorkspaceTooltip />}
    >
      <Form />
    </StepPage>
  );
}
