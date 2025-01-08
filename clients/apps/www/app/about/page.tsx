import AboutComponent from "@/components/about";
import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next/types";

export const metadata: Metadata = constructMetadata({
  title: "About",
  description: "About Solomon AI",
  canonical: "/about",
});

export default function About() {
  return (
    <div className="py-[5%]">
      <AboutComponent />
    </div>
  );
}
