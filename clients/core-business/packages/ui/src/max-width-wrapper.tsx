import type { ReactNode } from "react";
import { cn } from "@dub/utils";

export function MaxWidthWrapper({
  className,
  children,
  maxWidth = "1200px",
}: {
  className?: string;
  children: ReactNode;
  maxWidth?: string;
}) {
  return (
    <div
      className={cn("mx-auto w-full max-w-screen-xl px-3 lg:px-10", className)}
      style={{ maxWidth }}
    >
      {children}
    </div>
  );
}
