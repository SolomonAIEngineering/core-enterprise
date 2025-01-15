import InviteTeamTooltip from "@/ui/tooltip/invite-team-tooltip";
import { Users } from "@dub/ui/icons";
import { StepPage } from "../step-page";
import { Form } from "./form";

export default function Invite() {
  return (
    <StepPage
      icon={Users}
      title="Invite teammates"
      description={<InviteTeamTooltip />}
    >
      <Form />
    </StepPage>
  );
}
