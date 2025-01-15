import { Logo } from "@dub/ui";
import Link from "next/link";
import { redirect } from "next/navigation";
import WrappedPageClient from "./client";

export default function WrappedPage({
  params,
}: {
  params: { slug: string; year: string };
}) {
  if (params.year !== "2024") {
    redirect(`/${params.slug}`);
  }

  return (
    <div className="relative flex flex-col items-center">
      <Link href={`/${params.slug}`}>
        <Logo className="mt-6 h-8 w-8" />
      </Link>
      <WrappedPageClient />
    </div>
  );
}
