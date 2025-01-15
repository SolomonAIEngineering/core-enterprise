import Toolbar from "@/ui/layout/toolbar/toolbar";
import { NewBackground } from "@/ui/shared/new-background";
import type { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="relative min-h-screen w-full">
      <NewBackground showAnimation />
      <div className="relative z-10">
        {children}
        <Toolbar show={["help"]} />
      </div>
    </div>
  );
}
