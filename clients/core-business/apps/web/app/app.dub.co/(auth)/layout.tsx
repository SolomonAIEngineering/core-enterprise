import Link from "next/link";
import { NewBackground } from "@/ui/shared/new-background";
import { ReactNode } from "react";
import Toolbar from "@/ui/layout/toolbar/toolbar";
import { Wordmark } from "@dub/ui";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <Toolbar />
      <NewBackground showAnimation />
      <div className="relative z-10 flex min-h-screen w-full justify-center">
        <Link href="/" className="absolute left-4 top-3">
          <Wordmark className="h-6" />
        </Link>
        {children}
      </div>
    </div>
  );
}