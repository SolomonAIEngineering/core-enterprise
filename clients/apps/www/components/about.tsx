import { Tweet } from "@/components/tweet";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import React from "react";
import { Badge } from "./ui/badge";
import { components } from "./ui/my-tweet";

type VideoData = {
  src: string;
  title: string;
  description: string;
};

type VideoCardProps = VideoData;

const videoData: VideoData[] = [
  {
    src: "https://www.youtube.com/embed/Rzk3GmXUySs?si=2Y25oMlhbQWZpu1K",
    title: "Frying Pan`&apos;`s Latest YouTube video",
    description:
      "Pan shows the journey after just starting to build out Solomon AI. The product is described and a demo is shown. You also get to see a sneak peak into the founders`&apos;` week, and see the difficulties, the highs and lows we experience, all in NYC.",
  },
  {
    src: "https://www.youtube.com/embed/hHm4mtIp6K0",
    title: "Nang`&apos;`s Latest YouTube video",
    description:
      "Nang introduces Solomon AI, an AI-powered code editor aimed at transforming software development. He shares his journey from a high-paying job to pursuing startups and YouTube, encouraging viewers to chase their dreams with determination.",
  },
];

const AboutComponent: React.FC = () => {
  return (
    <section className={"mt-36"}>
      <div
        className={
          "m-4 mt-0 flex flex-col items-center lg:m-0 lg:justify-center"
        }
      >
        <h1 className="text-center text-4xl font-bold">
          Solomon AI is{" "}
          <span className="relative">
            <span className="relative z-10 text-foreground">Open Sourced</span>
            <span
              className="absolute bottom-0 left-0 w-full"
              style={{
                height: "1.4375rem",
                background: "rgba(20, 189, 149, 0.20)",
              }}
            ></span>
          </span>
          .
        </h1>
        <div className="flex w-full max-w-3xl flex-col gap-2">
          <div className="flex flex-col items-start justify-start gap-3 md:pt-[10%]">
            <p className="text-xl font-bold">Problem</p>
            <p className="text-left text-gray-500">
              In today`&apos;`s dynamic business environment, brick-and-mortar
              establishments and cyclical businesses face unique challenges that
              traditional financial tools fail to address effectively. Local
              businesses, from retail stores and restaurants to seasonal service
              providers, grapple with intricate demand patterns, complex
              inventory management requirements, and location-specific market
              dynamics.
            </p>
            <p className="text-left text-gray-500">
              The absence of specialized financial infrastructure leaves these
              businesses particularly vulnerable during transitional periods
              between peak and off-peak seasons, often resulting in cash flow
              disruptions and forecasting inaccuracies that can severely impact
              their operations and growth potential.
            </p>
          </div>
          <div className="flex flex-col items-start justify-start gap-3 md:pt-[10%]">
            <p className="text-xl font-bold">Solution</p>
            <p className="text-left text-gray-500">
              Solomon AI emerges as a groundbreaking solution to these
              challenges, introducing an open-source financial workspace
              specifically engineered for businesses with physical locations and
              seasonal demands. Building on Midday`&apos;`s foundation, our
              platform harnesses the power of advanced machine learning to
              deliver intelligent seasonal forecasting, location-based market
              analysis, and automated cash flow management tailored to varying
              business cycles.
            </p>
            <p className="text-left text-gray-500">
              By democratizing access to enterprise-grade financial tools
              through an open-source approach, we`&apos;`re transforming how
              local businesses handle their financial operations. Our
              comprehensive suite includes real-time inventory optimization,
              foot traffic analysis, and customizable financial modeling that
              adapts to multiple business locations, enabling businesses to turn
              seasonal fluctuations into strategic advantages rather than
              operational challenges.
            </p>
          </div>
          <div className="flex flex-col items-start justify-start gap-3 md:pt-[10%]">
            <p className="text-xl font-bold">Building In Public</p>
            <p className="text-left text-gray-500">
              At Solomon AI, transparency and community collaboration form the
              cornerstone of our development philosophy. We believe that the
              best solutions emerge when built in partnership with the very
              businesses they serve. This commitment manifests through
              continuous engagement with our user community, where every major
              development decision is shared and discussed openly.
            </p>
            <p className="text-left text-gray-500">
              Through regular feedback sessions, live demos, and workshops, we
              maintain a dynamic dialogue that directly shapes our product
              roadmap. Our open-source codebase serves as a foundation for
              community-driven innovation, enabling developers and businesses to
              customize and extend our platform to meet their specific needs.
              This collaborative approach ensures that Solomon AI evolves in
              alignment with the real-world challenges faced by brick-and-mortar
              and seasonal businesses, creating a financial platform that truly
              serves its community`&apos;`s needs.
            </p>
          </div>
        </div>
      </div>

      {/* <div className="flex items-center justify-center max-w-4xl px-4 m-auto mb-8">
        <Tweet id="1825456010862956844" components={components} />
      </div>

      <div className="flex flex-col items-center justify-center gap-4 p-4 pt-0 m-auto mb-10 lg:flex-row lg:p-0">
        {videoData.map((video, index) => (
          <VideoCard key={index} {...video} />
        ))}
      </div> */}

      {/* <div className="flex flex-col items-center justify-center p-4 pb-0 mt-0">
        <h2 className="text-4xl font-bold">
          <span className="relative">
            <span className="relative z-10">Founders</span>
            <span
              className="absolute bottom-0 left-0 w-full"
              style={{
                height: "1.4375rem",
                background: "rgba(20, 189, 149, 0.20)",
              }}
            ></span>
          </span>
        </h2>

        <div className="max-w-2xl text-gray-500">
          <p className="mt-6 text-center">
            Solomon AI is founded by Pan and Nang, both former software
            engineers who worked on developer tooling at companies like Meta,
            Coinbase, and high-frequency trading firms.
          </p>
          <p className="mt-3 text-center">
            Passionate about empowering individuals, they recognize code and
            media as the most scalable tools a single person can utilize. With a
            combined following of over 500k subscribers and over 30 million
            views, they&apos;ve decided to combine media and code, bringing the
            developer community along for the ride. They&apos;re building the
            next open-source AI-powered code editor, Solomon AI, with full
            transparency through videos, livestreams, and direct Discord
            calls/chats.
          </p>
        </div>
      </div> */}
    </section>
  );
};

const VideoCard: React.FC<VideoCardProps> = ({ src, title, description }) => (
  <Card>
    <CardContent
      className="flex flex-col-reverse p-4 sm:flex-col"
      style={{
        width: "100%",
        maxWidth: "30rem",
        minHeight: "24rem",
      }}
    >
      <div
        className="relative mt-4 sm:mb-4 sm:mt-0"
        style={{
          paddingBottom: "16rem",
        }}
      >
        <iframe
          className="absolute left-0 top-0 h-full w-full rounded"
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <CardDescription className="text-gray-500">{description}</CardDescription>
    </CardContent>
  </Card>
);

export default AboutComponent;
