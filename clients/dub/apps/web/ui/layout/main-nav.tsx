"use client";

import {
  type ComponentType,
  type Dispatch,
  type PropsWithChildren,
  type ReactNode,
  type SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

import { useMediaQuery } from "@dub/ui";
import { cn } from "@dub/utils";
import { usePathname } from "next/navigation";

type SideNavContext = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const SideNavContext = createContext<SideNavContext>({
  isOpen: false,
  setIsOpen: () => {},
});

export function MainNav({
  children,
  sidebar: Sidebar,
  toolContent,
  newsContent,
}: PropsWithChildren<{
  sidebar: ComponentType<{
    toolContent?: ReactNode;
    newsContent?: ReactNode;
  }>;
  toolContent?: ReactNode;
  newsContent?: ReactNode;
}>) {
  const pathname = usePathname();

  const { isMobile } = useMediaQuery();
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when side nav is open
  useEffect(() => {
    document.body.style.overflow = isOpen && isMobile ? "hidden" : "auto";
  }, [isOpen, isMobile]);

  // Close side nav when pathname changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="h-screen md:grid md:grid-cols-[240px_minmax(0,1fr)] md:py-[2%] md:pl-[2%]">
      {/* Side nav backdrop */}
      <div
        className={cn(
          "fixed left-0 top-0 z-50 h-dvh w-screen transition-[background-color,backdrop-filter] md:sticky md:z-auto md:w-full md:bg-transparent",
          isOpen
            ? "bg-black/20 backdrop-blur-sm"
            : "bg-transparent max-md:pointer-events-none",
        )}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            e.stopPropagation();
            setIsOpen(false);
          }
        }}
      >
        {/* Side nav */}
        <div
          className={cn(
            "h-[calc(100vh-4rem)] w-[240px] max-w-full bg-neutral-50 transition-transform md:translate-x-0",
            !isOpen && "-translate-x-full",
          )}
        >
          <Sidebar toolContent={toolContent} newsContent={newsContent} />
        </div>
      </div>
      <div className="h-screen bg-neutral-50 md:pb-1.5">
        <div className="dub-scrollbar border-3 bg-background text-card-foreground border-gray-150 scrollbar-hide relative h-[calc(100vh-4rem)] overflow-hidden rounded-2xl bg-neutral-50 pt-px shadow-xl md:m-[1%] md:bg-white">
          <div className="h-full overflow-y-auto rounded-2xl">
            <SideNavContext.Provider value={{ isOpen, setIsOpen }}>
              {children}
            </SideNavContext.Provider>
          </div>
        </div>
      </div>
    </div>
  );
}
