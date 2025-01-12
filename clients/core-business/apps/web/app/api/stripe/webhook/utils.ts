import { BusinessConfig as platform } from "@dub/platform-config";
import { sendEmail } from "emails";
import Stripe from "stripe";
const cancellationReasonMap = {
  customer_service: "you had a bad experience with our customer service",
  low_quality: "the product didn't meet your expectations",
  missing_features: "you were expecting more features",
  switched_service: "you switched to a different service",
  too_complex: "the product was too complex",
  too_expensive: "the product was too expensive",
  unused: "you didn't use the product",
};

export async function sendCancellationFeedback({
  owners,
  reason,
}: {
  owners: {
    name: string | null;
    email: string | null;
  }[];
  reason?: Stripe.Subscription.CancellationDetails.Feedback | null;
}) {
  const reasonText = reason ? cancellationReasonMap[reason] : "";

  return await Promise.all(
    owners.map(
      (owner) =>
        owner.email &&
        sendEmail({
          email: owner.email,
          from: platform.email.from.system,
          replyToFromEmail: true,
          subject: `Feedback for ${platform.company}?`,
          text: `Hey ${owner.name ? owner.name.split(" ")[0] : "there"}!\n\nSaw you canceled your ${platform.company} subscription${reasonText ? ` and mentioned that ${reasonText}` : ""} – do you mind sharing if there's anything we could've done better on our side?\n\nWe're always looking to improve our product offering so any feedback would be greatly appreciated!\n\nThank you so much in advance!\n\nBest,\n${platform.founderFirstName} \nFounder, ${platform.company}`,
        }),
    ),
  );
}
