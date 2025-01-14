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

import { BusinessConfig as platform } from "@dub/platform-config";
import Footer from "./components/footer";

export default function WelcomeEmail({
  name = "Brendon Urie",
  email = "panic@thedis.co",
}: {
  name: string | null;
  email: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to {platform.company}</Preview>
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
              Welcome to {platform.company}
            </Heading>
            <Section className="my-8">
              <Img
                src={platform.assets.thumbnail}
                alt={platform.company}
                className="max-w-[500px]"
              />
            </Section>
            <Text className="text-sm leading-6 text-black">
              Thanks for signing up{name && `, ${name}`}!
            </Text>
            <Text className="text-sm leading-6 text-black">
              My name is {platform.founderFirstName}, and I'm the founder of{" "}
              {platform.company} - {platform.description}. We're excited to have
              you on board!
            </Text>
            <Text className="text-sm leading-6 text-black">
              Here are a few things you can do:
            </Text>
            <Text className="ml-1 text-sm leading-4 text-black">
              ◆ Create a{" "}
              <Link
                href={`${platform.platformUrl}?newWorkspace=true`}
                className="font-medium text-blue-600 no-underline"
              >
                new workspace
              </Link>{" "}
            </Text>
            <Text className="ml-1 text-sm leading-4 text-black">
              ◆ Check out our{" "}
              <Link
                href={`${platform.documentationUrl}`}
                className="font-medium text-blue-600 no-underline"
              >
                API documentation
              </Link>{" "}
              for programmatic management of your account
            </Text>
            <Text className="text-sm leading-6 text-black">
              Let me know if you have any questions or feedback. I'm always
              happy to help!
            </Text>
            <Text className="text-sm font-light leading-6 text-gray-400">
              {platform.founderFirstName} from {platform.company}
            </Text>

            <Footer email={email} marketing />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
