import { AppSidebarNav } from "@/ui/layout/sidebar/app-sidebar-nav";
import { HelpButtonRSC } from "@/ui/layout/sidebar/help-button-rsc";
import { MainNav } from "@/ui/layout/main-nav";
import { ReactNode } from "react";
import { ReferButton } from "@/ui/layout/sidebar/refer-button";
import Toolbar from "@/ui/layout/toolbar/toolbar";
import { YearInReviewCard } from "@/ui/layout/sidebar/year-in-review-card";
import { constructMetadata } from "@dub/utils";

export const dynamic = "force-static";
export const metadata = constructMetadata();

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="fixed inset-0 bg-neutral-50">
        <MainNav
          sidebar={AppSidebarNav}
          toolContent={
            <>
              <ReferButton />
              <HelpButtonRSC />
            </>
          }
          newsContent={<YearInReviewCard />}
        >
          {children}
        </MainNav>
      </div>
      <Toolbar show={["onboarding"]} />
    </>
  );
}
