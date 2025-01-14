import { BusinessConfig as platform } from "@dub/platform-config";
import { constructMetadata } from "@dub/utils";
import PlaceholderContent from "./placeholder";
export const runtime = "edge";

export function generateMetadata({ params }: { params: { domain: string } }) {
  const title = `${params.domain.toUpperCase()} - A ${
    platform.company
  } Custom Domain`;
  const description = `${params.domain.toUpperCase()} is a custom domain on ${
    platform.company
  } - ${platform.title}.`;

  return constructMetadata({
    title,
    description,
  });
}

export default function CustomDomainPage() {
  return <PlaceholderContent />;
}
