import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next";
import updates from "./changelog";
import { TimelineItem } from "./timeline";

export const metadata: Metadata = constructMetadata({
  title: "Change Log",
  description: "The change logs for Solomon AI.",
  canonical: "/changelog",
});

const ChangeLog: React.FC = () => {
  return (
    <div className="mx-auto mb-32 mt-40 min-h-screen px-10 sm:mt-48 md:mt-52 lg:mt-56">
      <h1 className="mb-16 text-5xl font-bold text-foreground">Change Log</h1>
      <main>
        <section>
          {/* <!-- Timeline --> */}
          {updates.map((update, index) => (
            <TimelineItem key={index} {...update} />
          ))}
        </section>
      </main>
    </div>
  );
};

export default ChangeLog;
