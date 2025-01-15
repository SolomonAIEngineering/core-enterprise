import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

import { REFERRAL_CLICKS_QUOTA_BONUS } from "@/lib/embed/constants";
import { BusinessConfig as platform } from "@dub/platform-config";
import { getPrettyUrl } from "@dub/utils";
import Footer from "./components/footer";

export default function NewReferralSignup({
  email = "panic@thedis.co",
  workspace = {
    name: "Acme, Inc",
    slug: "acme",
  },
}: {
  email: string;
  workspace: {
    name: string;
    slug: string;
  };
}) {
  const referralLink = `${platform.referralUrl}/${workspace.slug}`;
  return (
    <Html>
      <Head />
      <Preview>New referral signup</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Section className="mt-8">
              <Img
                src={platform.assets.wordmark}
                height="40"
                alt={platform.company}
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">
              New referral signup
            </Heading>
            <Text className="text-sm leading-6 text-black">
              Congratulations – someone just signed up for {platform.company}{" "}
              using your referral link:{" "}
              <a
                href={referralLink}
                className="text-semibold font-medium text-black underline"
              >
                {getPrettyUrl(referralLink)}
              </a>
            </Text>
            <Text className="text-sm leading-6 text-black">
              As a thank you from us for spreading the word about{" "}
              {platform.company}, you've earned an additional{" "}
              {REFERRAL_CLICKS_QUOTA_BONUS} clicks quota for your{" "}
              <a
                href={`${platform.platformUrl}/${workspace.slug}`}
                className="text-semibold font-medium text-black underline"
              >
                {workspace.name}
              </a>{" "}
              workspace on {platform.company}.
            </Text>
            <Section className="my-8 text-center">
              <Link
                className="rounded-full bg-black px-6 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={`${platform.platformUrl}/${workspace.slug}`}
              >
                View your referral stats
              </Link>
            </Section>
            <Footer email={email} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
