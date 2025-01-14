import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
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

export default function SalesPerformanceSummary({
  email = "panic@thedis.co",
  workspace = {
    name: "Sales Team",
    slug: "sales",
    logo: platform.assets.logo,
  },
  performance = {
    period: "Last 30 Days",
    metrics: {
      totalRevenue: 450000,
      dealsWon: 32,
      avgDealSize: 14062.5,
      conversionRate: "68%",
      pipeline: 1200000,
    },
    topDeals: [
      {
        company: "Tech Corp",
        value: 75000,
        stage: "Closed Won",
        rep: "Jane Smith",
      },
      {
        company: "Global Systems",
        value: 60000,
        stage: "Closed Won",
        rep: "John Doe",
      },
    ],
    trends: {
      revenueGrowth: "+15%",
      dealVelocity: "Faster by 2 days",
      winRate: "Improved by 8%",
    },
    nextSteps: [
      "Review pipeline for Q4 targets",
      "Schedule team training on new features",
      "Update sales collateral",
      "Conduct win/loss analysis",
    ],
  },
}: {
  email: string;
  workspace: {
    name: string;
    slug: string;
    logo?: string | null;
  };
  performance: {
    period: string;
    metrics: {
      totalRevenue: number;
      dealsWon: number;
      avgDealSize: number;
      conversionRate: string;
      pipeline: number;
    };
    topDeals: Array<{
      company: string;
      value: number;
      stage: string;
      rep: string;
    }>;
    trends: {
      revenueGrowth: string;
      dealVelocity: string;
      winRate: string;
    };
    nextSteps: string[];
  };
}) {
  const stats = {
    "Total Revenue": `$${performance.metrics.totalRevenue.toLocaleString()}`,
    "Deals Won": performance.metrics.dealsWon.toString(),
    "Avg Deal Size": `$${performance.metrics.avgDealSize.toLocaleString()}`,
    "Win Rate": performance.metrics.conversionRate,
  };

  const pipelineStats = {
    "Pipeline Value": `$${performance.metrics.pipeline.toLocaleString()}`,
    "Revenue Growth": performance.trends.revenueGrowth,
    "Deal Velocity": performance.trends.dealVelocity,
  };

  return (
    <Html>
      <Head />
      <Preview>
        Sales Performance Summary: {performance.period} - $
        {performance.metrics.totalRevenue.toLocaleString()} revenue,{" "}
        {performance.metrics.dealsWon.toString()} deals won
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
              Sales Performance Summary 📊
            </Heading>
            <Text className="text-sm leading-6 text-black">
              Here's a comprehensive overview of your sales performance for{" "}
              {performance.period}. The data shows strong execution and
              highlights areas where we can further optimize for growth and
              efficiency.
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
                  <StatCard key={key} title={key} value={value} />
                ))}
              </Row>
            </Section>

            <Heading className="mx-0 mb-4 mt-8 p-0 text-xl font-semibold text-black">
              Pipeline & Growth Metrics 📈
            </Heading>
            <Text className="mb-4 text-sm leading-6 text-black">
              Your pipeline shows robust health and positive momentum. The
              growth metrics indicate strong market positioning and effective
              sales execution, setting a solid foundation for continued success.
            </Text>
            <Section className="my-4">
              <div className="rounded-lg border border-solid border-gray-200 p-4">
                <Row className="w-full">
                  {Object.entries(pipelineStats).map(([key, value]) => (
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
              Top Performing Deals 🏆
            </Heading>
            <Text className="mb-4 text-sm leading-6 text-black">
              These standout deals showcase successful execution of our sales
              strategy. Understanding the factors behind these wins can help
              replicate this success across the pipeline.
            </Text>
            <Section className="my-4">
              <div className="rounded-lg border border-solid border-gray-200 p-4">
                {performance.topDeals.map((deal, index) => (
                  <div
                    key={`${index}-${deal.company}-${Math.random()}`}
                    className={index !== 0 ? "mt-4" : ""}
                  >
                    <Row>
                      <Column className="px-2">
                        <Text className="m-0 text-sm font-medium text-gray-500">
                          Company
                        </Text>
                        <Text className="m-0 text-base font-medium">
                          {deal.company}
                        </Text>
                      </Column>
                      <Column className="px-2">
                        <Text className="m-0 text-sm font-medium text-gray-500">
                          Value
                        </Text>
                        <Text className="m-0 text-base font-medium">
                          ${deal.value.toLocaleString()}
                        </Text>
                      </Column>
                      <Column className="px-2">
                        <Text className="m-0 text-sm font-medium text-gray-500">
                          Rep
                        </Text>
                        <Text className="m-0 text-base font-medium">
                          {deal.rep}
                        </Text>
                      </Column>
                    </Row>
                    {index !== performance.topDeals.length - 1 && (
                      <Hr className="my-4 border-gray-200" />
                    )}
                  </div>
                ))}
              </div>
            </Section>

            <Heading className="mx-0 mb-4 mt-8 p-0 text-xl font-semibold text-black">
              Performance Trends 📊
            </Heading>
            <Text className="mb-4 text-sm leading-6 text-black">
              Key performance indicators show positive momentum across critical
              metrics. These trends reflect the effectiveness of our current
              sales strategies and highlight areas for potential optimization.
            </Text>
            <Section className="my-4">
              <div className="rounded-lg border border-solid border-gray-200 p-4">
                <Row>
                  {Object.entries(performance.trends).map(
                    ([key, value], index) => (
                      <Column key={key} className="px-2">
                        <Text className="m-0 text-sm font-medium text-gray-500">
                          {key.split(/(?=[A-Z])/).join(" ")}
                        </Text>
                        <Text className="m-0 text-base font-medium">
                          {value}
                        </Text>
                      </Column>
                    ),
                  )}
                </Row>
              </div>
            </Section>

            <Heading className="mx-0 mb-4 mt-8 p-0 text-xl font-semibold text-black">
              Recommended Next Steps 📋
            </Heading>
            <Text className="mb-4 text-sm leading-6 text-black">
              Based on current performance and trends, we've identified key
              actions to maintain momentum and drive continued growth.
              Implementing these steps will help optimize your sales process and
              outcomes.
            </Text>
            <Section className="my-4">
              <div className="rounded-lg border border-solid border-gray-200 p-4">
                {performance.nextSteps.map((step, index) => (
                  <Text
                    key={`${index}-${step}-${Math.random()}`}
                    className="m-0 mb-2 text-sm"
                  >
                    {index + 1}. {step}
                  </Text>
                ))}
              </div>
            </Section>

            <Text className="mb-4 mt-8 text-sm leading-6 text-black">
              Keep up the excellent work! Regular review of these metrics and
              proactive implementation of recommended steps will help maintain
              this positive momentum and drive even better results in the coming
              period.
            </Text>

            <Section className="mb-8 mt-8 text-center">
              <Link
                className="rounded-full bg-black px-6 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={`${platform.platformUrl}/${workspace.slug}/performance`}
              >
                View Detailed Performance
              </Link>
            </Section>
            <Footer email={email} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

const StatCard = ({ title, value }: { title: string; value: string }) => {
  return (
    <Column className="text-center">
      <Text className="font-medium text-gray-400">{title}</Text>
      <Text className="-mt-3 text-lg font-medium text-black">{value}</Text>
    </Column>
  );
};
