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

export default function SalesInsightReport({
  email = "panic@thedis.co",
  workspace = {
    name: "Sales Team",
    slug: "sales",
    logo: platform.assets.logo,
  },
  report = {
    period: "Last 30 Days",
    summary: {
      totalDeals: 45,
      closedWon: 28,
      revenue: 125000,
      avgDealSize: 4464,
      conversionRate: "62%",
    },
    trends: {
      dealVelocity: "Increased by 15%",
      topProducts: ["Enterprise Suite", "Professional Plan", "API Access"],
      commonObjections: [
        "Price point",
        "Implementation time",
        "Feature parity",
      ],
      winFactors: ["Product demo", "ROI calculation", "Technical review"],
    },
    recommendations: [
      "Focus on Enterprise Suite demos",
      "Highlight implementation support",
      "Emphasize ROI calculator in pitches",
      "Address price objections early",
    ],
  },
}: {
  email: string;
  workspace: {
    name: string;
    slug: string;
    logo?: string | null;
  };
  report: {
    period: string;
    summary: {
      totalDeals: number;
      closedWon: number;
      revenue: number;
      avgDealSize: number;
      conversionRate: string;
    };
    trends: {
      dealVelocity: string;
      topProducts: string[];
      commonObjections: string[];
      winFactors: string[];
    };
    recommendations: string[];
  };
}) {
  const stats = {
    "Total Deals": report.summary.totalDeals.toString(),
    "Closed Won": report.summary.closedWon.toString(),
    Revenue: `$${report.summary.revenue.toLocaleString()}`,
    Conversion: report.summary.conversionRate,
  };

  const dealMetrics = {
    "Avg Deal Size": `$${report.summary.avgDealSize.toLocaleString()}`,
    "Deal Velocity": report.trends.dealVelocity,
  };

  return (
    <Html>
      <Head />
      <Preview>
        Sales Insights Report: {report.period} -{" "}
        {report.summary.closedWon.toString()} deals closed, $
        {report.summary.revenue.toLocaleString()} revenue
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
              Sales Insights Report 📊
            </Heading>
            <Text className="text-sm leading-6 text-black">
              We've analyzed your sales performance data for {report.period} and
              identified key trends, patterns, and opportunities. This report
              provides actionable insights to help optimize your sales strategy
              and improve outcomes.
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
              Deal Performance 📈
            </Heading>
            <Text className="mb-4 text-sm leading-6 text-black">
              Analysis of your deal metrics reveals important patterns in sales
              velocity and deal size. Understanding these metrics can help
              optimize your sales process and resource allocation.
            </Text>
            <Section className="my-4">
              <div className="rounded-lg border border-solid border-gray-200 p-4">
                <Row className="w-full">
                  {Object.entries(dealMetrics).map(([key, value]) => (
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
              Key Success Factors 🎯
            </Heading>
            <Text className="mb-4 text-sm leading-6 text-black">
              We've identified the most effective elements in successful deals.
              These factors consistently contribute to higher win rates and
              should be emphasized in your sales approach.
            </Text>
            <Section className="my-4">
              <div className="rounded-lg border border-solid border-gray-200 p-4">
                {report.trends.winFactors.map((factor, index) => (
                  <Text key={index} className="m-0 mb-2 text-sm">
                    {index + 1}. {factor}
                  </Text>
                ))}
              </div>
            </Section>

            <Heading className="mx-0 mb-4 mt-8 p-0 text-xl font-semibold text-black">
              Product Performance 📦
            </Heading>
            <Text className="mb-4 text-sm leading-6 text-black">
              Analysis of product performance shows clear preferences in your
              market. Understanding which solutions resonate most can help focus
              your sales efforts and messaging.
            </Text>
            <Section className="my-4">
              <div className="rounded-lg border border-solid border-gray-200 p-4">
                {report.trends.topProducts.map((product, index) => (
                  <Text key={index} className="m-0 mb-2 text-sm">
                    {index + 1}. {product}
                  </Text>
                ))}
              </div>
            </Section>

            <Heading className="mx-0 mb-4 mt-8 p-0 text-xl font-semibold text-black">
              Common Objections 🤔
            </Heading>
            <Text className="mb-4 text-sm leading-6 text-black">
              Understanding frequent objections helps prepare better responses
              and improve deal progression. These insights can inform your pitch
              refinement and objection handling strategies.
            </Text>
            <Section className="my-4">
              <div className="rounded-lg border border-solid border-gray-200 p-4">
                {report.trends.commonObjections.map((objection, index) => (
                  <Text key={index} className="m-0 mb-2 text-sm">
                    {index + 1}. {objection}
                  </Text>
                ))}
              </div>
            </Section>

            <Heading className="mx-0 mb-4 mt-8 p-0 text-xl font-semibold text-black">
              Strategic Recommendations 💡
            </Heading>
            <Text className="mb-4 text-sm leading-6 text-black">
              Based on our analysis, we've developed targeted recommendations to
              enhance your sales effectiveness. Implementing these strategies
              can help improve win rates and accelerate deal closure.
            </Text>
            <Section className="my-4">
              <div className="rounded-lg border border-solid border-gray-200 p-4">
                {report.recommendations.map((recommendation, index) => (
                  <Text key={index} className="m-0 mb-2 text-sm">
                    {index + 1}. {recommendation}
                  </Text>
                ))}
              </div>
            </Section>

            <Text className="mb-4 mt-8 text-sm leading-6 text-black">
              Regular review and implementation of these insights will help
              optimize your sales process and drive better outcomes. Focus on
              the identified success factors while proactively addressing common
              objections.
            </Text>

            <Section className="mb-8 mt-8 text-center">
              <Link
                className="rounded-full bg-black px-6 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={`${platform.platformUrl}/${workspace.slug}/insights`}
              >
                View Detailed Insights
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
