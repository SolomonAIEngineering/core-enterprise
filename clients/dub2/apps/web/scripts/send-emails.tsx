import "dotenv-flow/config";

import { BusinessConfig as platform } from "@dub/platform-config";
import { sendEmail } from "emails";
import FailedPayment from "emails/failed-payment";

const attemptCount = 2;
const amountDue = 2400;
const user = {
  name: "Yoan",
  email: "yoanyombapro@gmail.com",
};
const workspace = {
  name: "Dub",
  slug: "dub",
};

async function main() {
  const res = await sendEmail({
    email: user.email as string,
    from: platform.email.from.default,
    subject: `${
      attemptCount === 2
        ? "2nd notice: "
        : attemptCount === 3
          ? "3rd notice: "
          : ""
    }Your payment for ${platform.company} failed`,
    react: (
      <FailedPayment
        attemptCount={attemptCount}
        amountDue={amountDue}
        user={user}
        workspace={workspace}
      />
    ),
  });

  console.log({ res });
}

main();
