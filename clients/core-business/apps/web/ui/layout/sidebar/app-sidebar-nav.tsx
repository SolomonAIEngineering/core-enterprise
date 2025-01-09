"use client";

import {
  Books2,
  Calendar6,
  CircleInfo,
  ConnectedDots,
  ConnectedDots4,
  CubeSettings,
  Gear2,
  Gift,
  Globe,
  Key,
  MoneyBills2,
  Receipt2,
  ShieldCheck,
  Users6,
  Webhook,
  WindowSettings,
} from "@dub/ui/icons";
import { Calendar, useRouterStuff } from "@dub/ui";
import { ReactNode, useMemo } from "react";
import { SidebarNav, SidebarNavAreas } from "./sidebar-nav";
import { useParams, usePathname } from "next/navigation";

import { BetaFeatures } from "@/lib/types";
import { CursorRays } from "./icons/cursor-rays";
import { Gear } from "./icons/gear";
import { Hyperlink } from "./icons/hyperlink";
import { LinesY } from "./icons/lines-y";
import { Session } from "next-auth";
import { Usage } from "./usage";
import UserSurveyButton from "../user-survey";
import { WorkspaceDropdown } from "./workspace-dropdown";
import usePrograms from "@/lib/swr/use-programs";
import { useSession } from "next-auth/react";
import useWorkspace from "@/lib/swr/use-workspace";

const NAV_AREAS: SidebarNavAreas<{
  slug: string;
  queryString: string;
  flags?: Record<BetaFeatures, boolean>;
  programs?: { id: string }[];
  session?: Session | null;
  showNews?: boolean;
}> = {
  // Top-level
  default: ({ slug, queryString, programs, showNews }) => ({
    showSwitcher: true,
    showNews,
    direction: "left",
    content: [
      {
        items: [
          {
            name: "Links",
            icon: Hyperlink,
            href: `/${slug}`,
            exact: true,
          },
          {
            name: "Analytics",
            icon: LinesY,
            href: `/${slug}/analytics${queryString}`,
          },
          {
            name: "Events",
            icon: CursorRays,
            href: `/${slug}/events${queryString}`,
          },
          {
            name: "Settings",
            icon: Gear,
            href: `/${slug}/settings`,
          },
        ],
      },
      ...(programs?.length
        ? [
          {
            name: "Programs",
            items: [
              {
                name: "Affiliate",
                icon: ConnectedDots4,
                href: `/${slug}/programs/${programs[0].id}`,
                items: [
                  {
                    name: "Overview",
                    href: `/${slug}/programs/${programs[0].id}`,
                    exact: true,
                  },
                  {
                    name: "Partners",
                    href: `/${slug}/programs/${programs[0].id}/partners`,
                  },
                  {
                    name: "Sales",
                    href: `/${slug}/programs/${programs[0].id}/sales`,
                  },
                  {
                    name: "Payouts",
                    href: `/${slug}/programs/${programs[0].id}/payouts`,
                  },
                  {
                    name: "Branding",
                    href: `/${slug}/programs/${programs[0].id}/branding`,
                  },
                  {
                    name: "Resources",
                    href: `/${slug}/programs/${programs[0].id}/resources`,
                  },
                  {
                    name: "Configuration",
                    href: `/${slug}/programs/${programs[0].id}/settings`,
                  },
                ],
              },
            ],
          },
        ]
        : []),
    ],
  }),

  // Workspace settings
  workspaceSettings: ({ slug, flags }) => ({
    title: "Settings",
    backHref: `/${slug}`,
    content: [
      {
        name: "Workspace",
        items: [
          {
            name: "General",
            icon: Gear2,
            href: `/${slug}/settings`,
            exact: true,
          },
          {
            name: "Billing",
            icon: Receipt2,
            href: `/${slug}/settings/billing`,
          },
          {
            name: "Domains",
            icon: Globe,
            href: `/${slug}/settings/domains`,
          },
          {
            name: "Library",
            icon: Books2,
            href: `/${slug}/settings/library`,
          },
          {
            name: "People",
            icon: Users6,
            href: `/${slug}/settings/people`,
          },
          {
            name: "Integrations",
            icon: ConnectedDots,
            href: `/${slug}/settings/integrations`,
          },
          {
            name: "Security",
            icon: ShieldCheck,
            href: `/${slug}/settings/security`,
          },
        ],
      },
      {
        name: "Developer",
        items: [
          {
            name: "API Keys",
            icon: Key,
            href: `/${slug}/settings/tokens`,
          },
          {
            name: "OAuth Apps",
            icon: CubeSettings,
            href: `/${slug}/settings/oauth-apps`,
          },
          ...(flags?.webhooks
            ? [
              {
                name: "Webhooks",
                icon: Webhook,
                href: `/${slug}/settings/webhooks`,
              },
            ]
            : []),
        ],
      },
      {
        name: "Account",
        items: [
          {
            name: "Notifications",
            icon: CircleInfo,
            href: `/${slug}/settings/notifications`,
          },
        ],
      },
    ],
  }),

  // User settings
  userSettings: ({ session, slug }) => ({
    title: "Settings",
    backHref: `/${slug}`,
    content: [
      {
        name: "Account",
        items: [
          {
            name: "General",
            icon: Gear2,
            href: "/account/settings",
            exact: true,
          },
          {
            name: "Security",
            icon: ShieldCheck,
            href: "/account/settings/security",
          },
          {
            name: "Date and Locale",
            icon: Calendar6,
            href: "/account/settings/date-and-locale",
          },
          {
            name: "Assistant Settings",
            icon: CubeSettings,
            href: "/account/settings/assistant-settings",
          },
          {
            name: "Financial Settings",
            icon: WindowSettings,
            href: "/account/settings/financial-settings",
          },
          ...(session?.user?.["referralLinkId"]
            ? [
              {
                name: "Referrals",
                icon: Gift,
                href: "/account/settings/referrals",
              },
            ]
            : []),
        ],
      },
    ],
  }),
};

export function AppSidebarNav({
  toolContent,
  newsContent,
}: {
  toolContent?: ReactNode;
  newsContent?: ReactNode;
}) {
  const { slug } = useParams() as { slug?: string };
  const pathname = usePathname();
  const { flags } = useWorkspace();
  const { getQueryString } = useRouterStuff();
  const { data: session } = useSession();
  const { programs } = usePrograms();

  const currentArea = useMemo(() => {
    return pathname.startsWith("/account/settings")
      ? "userSettings"
      : pathname.startsWith(`/${slug}/settings`)
        ? "workspaceSettings"
        : "default";
  }, [slug, pathname]);

  return (
    <SidebarNav
      areas={NAV_AREAS}
      currentArea={currentArea}
      data={{
        slug: slug || "",
        queryString: getQueryString(),
        flags,
        programs,
        session: session || undefined,
        showNews: pathname.startsWith(`/${slug}/programs/`) ? false : true,
      }}
      toolContent={toolContent}
      newsContent={newsContent}
      switcher={<WorkspaceDropdown />}
      bottom={
        <>
          <UserSurveyButton />
          <Usage />
        </>
      }
    />
  );
}
