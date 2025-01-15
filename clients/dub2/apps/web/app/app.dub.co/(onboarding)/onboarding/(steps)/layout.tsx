import { NewBackground } from "@/ui/shared/new-background";
import { Logo } from "@dub/ui";
import type { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="relative isolate min-h-screen">
      <NewBackground showAnimation />
      <div className="relative z-10 flex flex-col items-center">
        {/* <div className="absolute right-0 top-0">
          <ExitButton />
        </div> */}
        <Logo className="mt-6 h-8 w-8" />
        <div className="mt-8 flex w-full flex-col items-center px-3 pb-16 md:mt-20 lg:px-8">
          {children}
        </div>
      </div>
    </div>
  );
}
