import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

import { BusinessConfig as platform } from "@dub/platform-config";
import Footer from "./components/footer";

export default function LeadScoringUpdate({
  email = "panic@thedis.co",
  lead = {
    name: "John Smith",
    company: "Acme Corp",
    previousScore: 45,
    newScore: 85,
    factors: [
      "Visited pricing page 3 times",
      "Downloaded whitepaper",
      "Engaged with email campaign",
      "Company size increased",
    ],
    recommendation: "Immediate sales follow-up recommended",
    industry: "Technology",
    lastActivity: "Downloaded Enterprise Whitepaper",
    timeSpent: "15 minutes",
  },
  workspace = {
    name: "Sales Team",
    slug: "sales",
    logo: platform.assets.logo,
  },
}: {
  email: string;
  lead: {
    name: string;
    company: string;
    previousScore: number;
    newScore: number;
    factors: string[];
    recommendation: string;
    industry: string;
    lastActivity: string;
    timeSpent: string;
  };
  workspace: {
    name: string;
    slug: string;
    logo?: string | null;
  };
}) {
  const scoreChange = lead.newScore - lead.previousScore;
  const isPositive = scoreChange > 0;

  const stats = {
    "Previous Score": lead.previousScore.toString(),
    "New Score": lead.newScore.toString(),
    Change: `${isPositive ? "+" : ""}${scoreChange}`,
    Industry: lead.industry,
  };

  const engagementStats = {
    "Last Activity": lead.lastActivity,
    "Time Spent": lead.timeSpent,
    "Engagement Signals": `${lead.factors.length} signals`,
  };

  return (
    <Html>
      <Head />
      <Preview>
        Lead Score Update: {lead.company} ({lead.previousScore.toString()} →{" "}
        {lead.newScore.toString()}) {isPositive ? "📈" : "📉"}
      </Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Section className="mt-8">
              <Img
                src={platform.assets.wordmark}
                height="32"
                alt={platform.company}
                className="my-0"
              />
            </Section>
            <Heading className="mx-0 mb-4 mt-8 p-0 text-xl font-semibold text-black">
              Lead Score Update {isPositive ? "📈" : "📉"}
            </Heading>
            <Text className="text-sm leading-6 text-black">
              Our lead scoring system has detected significant changes in
              engagement patterns for this lead. The updated score reflects
              meaningful interactions and behavioral signals that indicate
              evolving sales readiness and potential opportunity advancement.
            </Text>

            <Section className="my-8 rounded-lg border border-solid border-gray-200 p-2">
              <div>
                <Img
                  src="https://assets.dub.co/misc/year-in-review-header.jpg"
                  alt="header"
                  className="max-w-[500px] rounded-lg"
                />
                <div className="-mt-[90px] mb-[30px] text-center">
                  {workspace.logo && (
                    <Img
                      src={workspace.logo}
                      height="36"
                      alt={workspace.name}
                      className="mx-auto rounded-lg"
                    />
                  )}
                  <Text className="mt-1 text-xl font-semibold">
                    {workspace.name}
                  </Text>
                </div>
              </div>
              <Row className="w-full px-4 py-2">
                {Object.entries(stats).map(([key, value]) => (
                  <StatCard
                    key={key}
                    title={key}
                    value={value}
                    isScore={key.includes("Score") || key === "Change"}
                    isPositive={isPositive}
                  />
                ))}
              </Row>
            </Section>

            <Heading className="mx-0 mb-4 mt-8 p-0 text-xl font-semibold text-black">
              Lead Profile 👤
            </Heading>
            <Text className="mb-4 text-sm leading-6 text-black">
              This lead from the {lead.industry} sector has shown notable
              changes in their engagement level. Understanding their profile
              will help you contextualize the score change and adapt your
              engagement strategy accordingly.
            </Text>
            <Section className="my-4">
              <div className="rounded-lg border border-solid border-gray-200 p-4">
                <Row>
                  <Column className="px-2">
                    <Text className="m-0 text-sm font-medium text-gray-500">
                      Name
                    </Text>
                    <Text className="m-0 text-lg font-bold">{lead.name}</Text>
                  </Column>
                  <Column className="px-2">
                    <Text className="m-0 text-sm font-medium text-gray-500">
                      Company
                    </Text>
                    <Text className="m-0 text-lg font-bold">
                      {lead.company}
                    </Text>
                  </Column>
                </Row>
              </div>
            </Section>

            <Heading className="mx-0 mb-4 mt-8 p-0 text-xl font-semibold text-black">
              Engagement Signals 📊
            </Heading>
            <Text className="mb-4 text-sm leading-6 text-black">
              Recent interactions have contributed to the score change. These
              engagement signals provide insights into the lead's interests and
              level of intent, helping you understand their journey and
              potential needs.
            </Text>
            <Section className="my-4">
              <div className="rounded-lg border border-solid border-gray-200 p-4">
                <Row className="w-full">
                  {Object.entries(engagementStats).map(([key, value]) => (
                    <Column key={key} className="px-2 text-center">
                      <Text className="m-0 text-sm font-medium text-gray-500">
                        {key}
                      </Text>
                      <Text className="m-0 text-base font-medium">{value}</Text>
                    </Column>
                  ))}
                </Row>
              </div>
            </Section>

            <Heading className="mx-0 mb-4 mt-8 p-0 text-xl font-semibold text-black">
              Key Activities 📈
            </Heading>
            <Text className="mb-4 text-sm leading-6 text-black">
              The following activities have significantly influenced the lead's
              score. Each interaction provides valuable context about their
              interests and potential pain points that you can address in your
              next engagement.
            </Text>
            <Section className="my-4">
              <div className="rounded-lg border border-solid border-gray-200 p-4">
                {lead.factors.map((factor, index) => (
                  <Text
                    key={`${index}-${factor}-${Math.random()}`}
                    className="m-0 mb-2 text-sm"
                  >
                    {index + 1}. {factor}
                  </Text>
                ))}
              </div>
            </Section>

            <Heading className="mx-0 mb-4 mt-8 p-0 text-xl font-semibold text-black">
              Strategic Recommendation 🎯
            </Heading>
            <Text className="mb-4 text-sm leading-6 text-black">
              Based on the score change and recent engagement patterns, we've
              formulated a targeted recommendation. This guidance is designed to
              help you capitalize on the lead's current interest level and move
              the opportunity forward effectively.
            </Text>
            <Section className="my-4">
              <div className="rounded-lg border border-solid border-gray-200 p-4">
                <Text className="m-0 text-sm">{lead.recommendation}</Text>
              </div>
            </Section>

            <Text className="mb-4 mt-8 text-sm leading-6 text-black">
              This score update indicates a significant shift in the lead's
              engagement level. Taking prompt action based on these insights
              will help maintain momentum and maximize the opportunity for
              successful conversion.
            </Text>

            <Section className="mb-8 mt-8 text-center">
              <Link
                className="rounded-full bg-black px-6 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={`${platform.platformUrl}/${workspace.slug}/leads`}
              >
                View Lead Details
              </Link>
            </Section>
            <Footer email={email} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

const StatCard = ({
  title,
  value,
  isScore = false,
  isPositive = true,
}: {
  title: string;
  value: string;
  isScore?: boolean;
  isPositive?: boolean;
}) => {
  const textColor = isScore
    ? isPositive
      ? "text-green-600"
      : "text-red-600"
    : "text-black";

  return (
    <Column className="text-center">
      <Text className="font-medium text-gray-400">{title}</Text>
      <Text className={`-mt-3 text-lg font-medium ${textColor}`}>{value}</Text>
    </Column>
  );
};
