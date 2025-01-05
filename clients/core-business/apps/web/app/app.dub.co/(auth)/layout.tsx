import Link from "next/link";
import { NewBackground } from "@/ui/shared/new-background";
import type { ReactNode } from "react";
import Toolbar from "@/ui/layout/toolbar/toolbar";
import { Wordmark } from "@dub/ui";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Toolbar />
      <NewBackground />
      <div className="relative flex min-h-screen w-full justify-center">
        <Link href="/" className="absolute left-4 top-3 z-10">
          <Wordmark className="h-6" />
        </Link>
        {children}
      </div>
    </>
  );
}
