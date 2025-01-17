import { BusinessConfig as platform } from "@dub/platform-config";
import { Globe } from "@dub/ui/icons";
import { StepPage } from "../../step-page";
import { Form } from "./form";

export default function Custom() {
  return (
    <StepPage
      icon={Globe}
      title="Connect a custom domain"
      description={
        <a
          href={`${platform.webUrl}/help/article/choosing-a-custom-domain`}
          target="_blank"
          className="underline transition-colors hover:text-gray-700"
          rel="noreferrer"
        >
          Read our guide for best practices
        </a>
      }
    >
      <Form />
    </StepPage>
  );
}
