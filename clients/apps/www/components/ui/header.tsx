import { ComponentPropsWithoutRef, ReactNode, forwardRef } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import AuthButton from "./authbutton";
import DarkModeToggle from "./darkmode-toggle";
import Link from "next/link";
import { List } from "@radix-ui/react-navigation-menu";
import LogoIcon from "../logo-icon";
import MobileMenu from "./mobile-menu";
import PearGreenLogo from "./PearGreen.svg";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const NavItem = ({
  href,
  target = "_self",
  children,
}: {
  href: string;
  target?: React.HTMLAttributeAnchorTarget;
  children: ReactNode;
}) => (
  <NavigationMenuLink
    asChild
    className={navigationMenuTriggerStyle()}
    href={href}
    target={target}
  >
    <Link href={href}>{children}</Link>
  </NavigationMenuLink>
);

const DropdownNavItem = ({
  trigger,
  children,
}: {
  trigger: string;
  children: ReactNode;
}) => (
  <NavigationMenuItem>
    <NavigationMenuTrigger>{trigger}</NavigationMenuTrigger>
    <NavigationMenuContent>{children}</NavigationMenuContent>
  </NavigationMenuItem>
);

const ListItem = forwardRef<
  HTMLAnchorElement,
  ComponentPropsWithoutRef<"a"> & { title: string; href: string }
>(({ className, title, children, href, ...props }, ref) => (
  <li>
    <NavigationMenuLink asChild>
      <Link
        ref={ref}
        href={href}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-secondary-300/10 hover:text-accent-foreground focus:bg-secondary-300/10 focus:text-accent-foreground",
          className,
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </Link>
    </NavigationMenuLink>
  </li>
));
ListItem.displayName = "ListItem";

export default async function Header() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  const handleSignOut = async () => {
    "use server";
    const supabase = createClient();
    await supabase.auth.signOut();
    redirect("/");
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 p-3 transition-all duration-300 ease-in-out">
      <div className="mx-auto max-w-6xl">
        <nav
          // eslint-disable-next-line prettier/prettier
          className="rounded-full border border-border/50 bg-background shadow-md transition-all duration-300 ease-in-out"
          aria-label="Main navigation"
        >
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <Link
                  href="/"
                  className="flex flex-shrink-0 items-center"
                  aria-label="Solomon AI Home"
                >
                  {/* <PearGreenLogo /> */}
                  {/* <LogoIcon /> */}
                  <div className="h6 ml-2 font-bold">Solomon AI</div>
                </Link>
                <nav className="ml-10 hidden md:block" aria-label="Main menu">
                  <NavigationMenu>
                    <NavigationMenuList className="space-x-1">
                      <DropdownNavItem trigger="Resources">
                        <ul className="grid w-[400px] gap-3 bg-background p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          <ListItem href="/about" title="About">
                            Learn more about Solomon AI
                          </ListItem>
                          <ListItem href="/blog" title="Blog">
                            Read insights on Solomon AI&apos;s development by
                            our contributors
                          </ListItem>
                          <ListItem href="/faq" title="FAQ">
                            Frequently asked questions about Solomon AI
                          </ListItem>
                          <ListItem href="/changelog" title="Changelog">
                            See what&apos;s new in Solomon AI
                          </ListItem>
                          <ListItem
                            href="https://developer-platform.solomon-ai.app/landing"
                            title="Developer Platform"
                          >
                            Learn how to build on Solomon AI
                          </ListItem>
                        </ul>
                      </DropdownNavItem>
                      <NavItem href="https://enterprise.solomon-ai.app">
                        Enterprise
                      </NavItem>
                      <NavItem href="https://business.solomon-ai.app/">
                        Businesses
                      </NavItem>
                      <NavItem href="/pricing">Pricing</NavItem>
                      <NavItem href="/desktop-download">Download</NavItem>
                      <NavItem href="https://solomon-ai.betteruptime.com/">
                        Uptime{" "}
                      </NavItem>
                      {/* <NavItem href="https://engineering-docs.solomon-ai.app/">
                        Documentation
                      </NavItem> */}
                      {/* <NavItem
                        href="https://github.com/SolomonAIEngineering/solomonai/tree/main"
                        target="_blank"
                      >
                        GitHub
                      </NavItem> */}
                    </NavigationMenuList>
                  </NavigationMenu>
                </nav>
              </div>
              <div className="hidden items-center space-x-4 md:flex">
                <AuthButton />
                <DarkModeToggle />
              </div>
              <div className="md:hidden">
                <MobileMenu user={user} handleSignOut={handleSignOut} />
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
