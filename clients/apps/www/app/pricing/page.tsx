import PricingPage from "@/components/pricing";
import { constructMetadata } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next/types";

export const metadata: Metadata = constructMetadata({
  title: "Pricing",
  description: "The pricing and download page for Solomon AI.",
  canonical: "/pricing",
});

export default async function Pricing() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="py-[5%]">
      <PricingPage user={user} />
    </div>
  );
}
