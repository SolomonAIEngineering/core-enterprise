import { BusinessConfig as platform } from "@dub/platform-config";
import { sendEmail } from "emails";
import type Stripe from "stripe";

const cancellationReasonMap = {
  customer_service: "you had a bad experience with our customer service",
  low_quality: "the product didn't meet your expectations",
  missing_features: "you were expecting more features",
  switched_service: "you switched to a different service",
  too_complex: "the product was too complex",
  too_expensive: "the product was too expensive",
  unused: "you didn't use the product",
  budget_cuts: "your company is going through budget cuts",
  no_business_need: "your business needs have changed",
  technical_issues: "you experienced technical difficulties",
  poor_performance: "the service performance wasn't meeting your needs",
  lack_of_integration: "you needed better integration with other tools",
  company_closing: "your company is shutting down or restructuring",
  seasonal_use: "you only needed the service temporarily",
  better_alternative: "you found a solution that better fits your needs",
  insufficient_support: "you needed more technical support",
  security_concerns: "you had concerns about security or compliance",
  usability_issues: "the interface was difficult to navigate",
  onboarding_difficulty: "the onboarding process was too challenging",
  billing_issues: "you experienced problems with billing or payments",
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
          from: platform.email.from.default,
          replyTo: platform.email.replyTo,
          subject: `Feedback for ${platform.company}?`,
          text: `Hey ${owner.name ? owner.name.split(" ")[0] : "there"}!\n\nSaw you canceled your ${platform.company} subscription${reasonText ? ` and mentioned that ${reasonText}` : ""} – do you mind sharing if there's anything we could've done better on our side?\n\nWe're always looking to improve our product offering so any feedback would be greatly appreciated!\n\nThank you so much in advance!\n\nBest,\n${platform.founder}\nFounder, ${platform.company}`,
        }),
    ),
  );
}
