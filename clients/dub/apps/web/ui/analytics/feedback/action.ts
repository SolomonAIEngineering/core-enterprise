"use server";

import { resend } from "@/lib/resend";
import { BusinessConfig as platform } from "@dub/platform-config";
import FeedbackEmail from "emails/feedback-email";

export async function submitFeedback(data: FormData) {
  const email = data.get("email") as string;
  const feedback = data.get("feedback") as string;

  return await resend?.emails.send({
    from: `${platform.email.from.feedback}`,
    to: `${platform.email.from.default}`,
    ...(email && { replyTo: email }),
    subject: "🎉 New Feedback Received!",
    react: FeedbackEmail({ email, feedback }),
  });
}
