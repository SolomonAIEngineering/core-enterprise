import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { constructMetadata } from "@/lib/utils";
import { FAQItem } from "@/types/faqItems";
import Link from "next/link";
import { Metadata } from "next/types";
import React from "react";

export const metadata: Metadata = constructMetadata({
  title: "FAQ",
  description: "Frequently Asked Questions",
  canonical: "/faq",
});

const FAQ: React.FC = () => {
  return (
    <div className="py-[5%]">
      <section className="mx-auto mt-36 flex w-full flex-col items-center px-4">
        <div className="mb-16 text-center">
          <h2
            className="mb-4 whitespace-pre-line text-3xl font-bold text-foreground"
            data-aos="fade-up"
          >
            Frequently Asked Questions
          </h2>
          <p
            className="whitespace-pre-line text-base text-gray-600"
            data-aos="fade-up"
          >
            Can&apos;t find the answer you&apos;re looking for? Ask us on our{" "}
            <Link
              className="underline"
              rel="noopener noreferrer"
              target="_blank"
              href="https://discord.gg/GkmmZyex"
            >
              Discord
            </Link>
            .
          </p>
        </div>
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-3xl space-y-4 px-8"
        >
          {faqData.map((item, index) => (
            <AccordionItem key={index} value={String(index + 1)}>
              <AccordionTrigger className="text-left text-base font-medium">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="whitespace-pre-line text-sm text-gray-600">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
          <AccordionItem value={"contribute"}>
            <AccordionTrigger className="text-left text-base">
              7. How can I contribute to Solomon AI?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-gray-600">
              See the contributor&apos;s section:{" "}
              <Link
                rel="noopener noreferrer"
                className="underline"
                target="_blank"
                href="https://github.com/SolomonAIEngineering/solomonai/blob/main/.github/CONTRIBUTING.md"
              >
                Contributing 101
              </Link>
              .
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
};

export default FAQ;
const faqData: FAQItem[] = [
  {
    question: "0. Why is it called Solomon AI?",
    answer: (
      <p>
        Solomon AI is named after King Solomon, known for his wisdom in managing
        resources and making sound judgments. This reflects our mission to bring
        intelligent financial insights to businesses.
      </p>
    ),
  },
  {
    question:
      "1. What separates Solomon AI from traditional financial software and other competitors?",
    answer: (
      <p>
        Solomon AI offers significant advantages over traditional financial
        tools and competitors: <br />
        <br />
        AI Model Flexibility: Unlike traditional financial software, Solomon AI
        leverages advanced AI models to provide dynamic, adaptive solutions for
        seasonal businesses. Our platform can integrate with various AI
        providers. <br />
        <br />
        Enhanced Business Context: Using RAG (Retrieval Augmented Generation),
        Solomon AI understands your business`&apos;`s unique seasonal patterns
        and location-specific challenges, making recommendations more relevant
        and actionable for your specific situation. <br />
        <br />
        Complete Financial Workspace: Rather than just being a single-purpose
        tool, Solomon AI provides a comprehensive environment for managing all
        aspects of your business`&apos;`s financial operations, from seasonal
        forecasting to inventory management. <br />
        <br />
        Open-Source Advantage: Solomon AI is fully transparent and open-source,
        enabling community-driven innovation and customization. This allows
        businesses to adapt the platform to their specific needs and benefit
        from continuous improvements contributed by the community. See why this
        matters in our blog post:{" "}
        <Link
          href="/blog/why-open-source"
          className="text-primary-600 hover:underline"
        >
          Why Open Source Matters for Financial Technology
        </Link>
        .
      </p>
    ),
  },
  {
    question: "2. Why should my business switch to Solomon AI?",
    answer: (
      <p>
        Solomon AI will transform how you manage your business`&apos;`s
        financial operations. Our platform integrates seamlessly with existing
        financial tools while adding powerful AI capabilities specifically
        designed for seasonal and location-based businesses. Users have reported
        significant improvements in forecasting accuracy and operational
        efficiency.
        <br />
        <br />
        By switching to Solomon AI, you`&apos;`ll gain access to
        enterprise-grade financial tools that understand and adapt to your
        business`&apos;`s unique seasonal patterns, helping you stay ahead of
        market changes and optimize your operations throughout the year.
      </p>
    ),
  },
  {
    question:
      "3. Why can't I just use traditional financial software or general AI tools instead?",
    answer: (
      <p>
        Solomon AI is specifically designed for businesses with seasonal
        patterns and physical locations. Unlike general-purpose tools, our
        platform understands the unique challenges of cyclical businesses,
        providing integrated solutions for inventory management, cash flow
        optimization, and seasonal forecasting. The platform`&apos;`s AI
        capabilities are fine-tuned for your specific business context,
        delivering more accurate and actionable insights than generic solutions.
      </p>
    ),
  },
  {
    question:
      "4. Is Solomon AI a standalone platform or an add-on to existing software?",
    answer: (
      <p>
        Solomon AI is a comprehensive financial workspace. Being a full platform
        rather than just an add-on allows us to provide the most integrated and
        effective experience for managing your business`&apos;`s financial
        operations.
        <br />
        <br />
        While we integrate with many popular financial tools, our platform
        offers unique capabilities that go beyond simple add-on functionality,
        providing a complete solution for seasonal and location-based
        businesses.
      </p>
    ),
  },
  {
    question: "5. Does Solomon AI store my financial data?",
    answer: (
      <p>
        We take data security seriously. All financial analysis and processing
        occurs on our {""}(
        <Link
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4"
          href="https://github.com/orgs/SolomonAIEngineering/repositories"
        >
          backend services
        </Link>
        ). Our platform maintains strict data privacy standards, ensuring your
        sensitive financial information remains secure.
      </p>
    ),
  },
  {
    question:
      "6. What unique features does Solomon AI offer for seasonal businesses?",
    answer: (
      <div>
        <ul className="list-disc space-y-2 pl-5">
          <li>Intelligent seasonal demand forecasting and trend analysis</li>
          <li>Location-specific market insights and performance metrics</li>
          <li>Automated cash flow management for varying business cycles</li>
          <li>Real-time inventory optimization based on seasonal patterns</li>
          <li>
            Customizable financial modeling for multiple business locations
          </li>
          <li>AI-powered risk assessment and stress testing</li>
          <li>Dynamic budget adjustments for peak and off-peak seasons</li>
          <li>
            Integrated foot traffic analysis and customer behavior patterns
          </li>
          <li>Automated financial reporting with seasonal context</li>
          <li>Multi-location performance comparison and optimization</li>
        </ul>
        <p className="mt-2">
          These features represent the capabilities in development, but
          we`&apos;`re continuously expanding. Our roadmap includes enhanced
          predictive analytics, deeper integration with point-of-sale systems,
          and advanced scenario planning tools.
          <br /> <br />
          We`&apos;`ve invested significant effort in building a robust
          foundation that understands the unique challenges of seasonal
          businesses. Our platform includes comprehensive documentation,
          community support through our Discord channel, and regular updates
          based on user feedback.
          <br /> <br />
          You can track our development progress and upcoming features on our
          public GitHub repository{" "}
          <Link
            href="https://github.com/solomon-ai/projects"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            here
          </Link>
          .
        </p>
      </div>
    ),
  },
];
