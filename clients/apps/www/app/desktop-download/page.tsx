import { DownloadPage } from "@/components/download";
import PricingPage from "@/components/pricing";
import { constructMetadata } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next/types";

export const metadata: Metadata = constructMetadata({
  title: "Download",
  description: "Download the desktop app.",
  canonical: "/desktop-download",
});

export default async function Download() {
  return (
    <div className="py-[5%]">
      <DownloadPage />
    </div>
  );
}
