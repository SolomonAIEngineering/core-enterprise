import { PageContent } from "@/ui/layout/page-content";
import { MaxWidthWrapper } from "@dub/ui";
import { InvitePartnerButton } from "./invite-partner-button";
import { InvitesTableLink } from "./invites-table-link";
import { ProgramPartnersPageClient } from "./page-client";

export default function ProgramPartners() {
  return (
    <PageContent
      title="Partners"
      titleControls={
        <div className="flex items-center gap-2">
          <InvitePartnerButton />
          <InvitesTableLink />
        </div>
      }
    >
      <MaxWidthWrapper>
        <ProgramPartnersPageClient />
      </MaxWidthWrapper>
    </PageContent>
  );
}