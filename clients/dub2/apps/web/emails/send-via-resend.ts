import { resend } from "@/lib/resend";
import { BusinessConfig as platform } from "@dub/platform-config";
import type { CreateEmailOptions } from "resend";

export const sendEmailViaResend = async ({
  email,
  subject,
  from,
  bcc,
  replyToFromEmail,
  text,
  react,
  scheduledAt,
  marketing,
}: Omit<CreateEmailOptions, "to" | "from"> & {
  email: string;
  from?: string;
  replyToFromEmail?: boolean;
  marketing?: boolean;
}) => {
  if (!resend) {
    console.info(
      "RESEND_API_KEY is not set in the .env. Skipping sending email.",
    );
    return;
  }

  return await resend.emails.send({
    to: email,
    from:
      from ||
      (marketing
        ? `${platform.email.from.default}`
        : `${platform.email.from.system}`),
    bcc: bcc,
    ...(!replyToFromEmail && {
      replyTo: platform.email.replyTo,
    }),
    subject: subject,
    text: text,
    react: react,
    scheduledAt,
    ...(marketing && {
      headers: {
        "List-Unsubscribe": `${platform.platformUrl}/account/settings`,
      },
    }),
  });
};
