"use client";

import PearDarkHeroLogo from "@/components/ui/PearDarkHeroLogo.svg";
import PearHeroLogo from "@/components/ui/PearHeroLogo.svg";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Link from "next/link";

const HeroTitle = ({ theme }: { theme: string }) => (
  <>
    <div className="hidden items-start sm:inline-block">
      {theme === "dark" ? (
        <PearDarkHeroLogo
          width="26"
          alt="Solomon AI Logo"
          className="mb-4 mr-2 inline-flex"
        />
      ) : (
        <PearHeroLogo
          width="26"
          alt="Solomon AI Logo"
          className="mb-4 mr-2 inline-flex"
        />
      )}
      The Financial workspace for cyclical businesses
    </div>

    <div className="block items-start sm:hidden">
      <div>
        {theme === "dark" ? (
          <PearDarkHeroLogo
            width="20"
            alt="Solomon AI Logo"
            className="mb-3 mr-2 inline-flex"
          />
        ) : (
          <PearHeroLogo
            width="20"
            alt="Solomon AI Logo"
            className="mb-3 mr-2 inline-flex"
          />
        )}
        <span className="text-foreground">Solomon AI </span>
      </div>
      <span className="flex flex-col text-3xl">
        <span>The Open Source</span> <span>Financial Workspace</span>
      </span>
    </div>
  </>
);

const HeroDescription = () => (
  <div className="mt-6 max-w-lg">
    <p
      className="mb-2 text-sm text-gray-500 sm:text-lg"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      The right tools for the often-overlooked needs of brick-and-mortar
      businesses and seasonal operations.
    </p>
  </div>
);
const HeroButtons = () => {
  return (
    <div className="mx-auto flex max-w-sm flex-col items-center justify-center sm:max-w-none">
      <div
        data-aos="fade-up"
        data-aos-delay="400"
        className="flex flex-col items-center"
      >
        <Button asChild size="lg">
          <Link href="/desktop-download">Download For Free</Link>
        </Button>
      </div>
    </div>
  );
};
export default function Hero() {
  const { theme } = useTheme();

  return (
    <section>
      <div className="relative mx-auto mt-24 max-w-6xl px-4 sm:px-6">
        <div className="relative pb-10 pt-24">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 pb-12 text-center md:pb-16">
            <div className="text-4xl font-semibold text-gray-900 sm:text-5xl">
              <HeroTitle theme={theme!} />
            </div>
            <HeroDescription />
            <HeroButtons />
          </div>
        </div>
      </div>
    </section>
  );
}
