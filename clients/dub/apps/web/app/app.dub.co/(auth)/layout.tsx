import Toolbar from "@/ui/layout/toolbar/toolbar";
import { NewBackground } from "@/ui/shared/new-background";
import { Logo } from "@dub/ui";
import Link from "next/link";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <Toolbar />
      <NewBackground showAnimation />
      <div className="relative z-10 flex min-h-screen w-full justify-center">
        <Link href="/" className="absolute left-4 top-3">
          <Logo className="h-10 w-10" />
        </Link>
        {children}
      </div>
    </div>
  );
}
