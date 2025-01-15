import { NextRequest, NextResponse } from "next/server";

import EmbedMiddleware from "./embed";
import NewLinkMiddleware from "./new-link";
import WorkspacesMiddleware from "./workspaces";
import { appRedirect } from "./utils/app-redirect";
import { getDefaultWorkspace } from "./utils/get-default-workspace";
import { getOnboardingStep } from "./utils/get-onboarding-step";
import { getUserViaToken } from "./utils/get-user-via-token";
import { isTopLevelSettingsRedirect } from "./utils/is-top-level-settings-redirect";
import { parse } from "@/lib/middleware/utils";

export default async function AppMiddleware(req: NextRequest) {
  const { path, fullPath } = parse(req);

  if (path.startsWith("/embed")) {
    return EmbedMiddleware(req);
  }

  const user = await getUserViaToken(req);
  const isWorkspaceInvite =
    req.nextUrl.searchParams.get("invite") || path.startsWith("/invites/");

  // List of public paths that don't require authentication
  const publicPaths = [
    "/login",
    "/forgot-password",
    "/register",
    "/auth/saml",
    "/onboarding",
    "/onboarding/workspace"
  ];

  // Check if current path is public or starts with allowed prefixes
  const isPublicPath = publicPaths.includes(path) ||
    path.startsWith("/auth/reset-password/") ||
    path.startsWith("/share/") ||
    path.startsWith("/onboarding/");

  // Redirect to login if no user and not a public path
  if (!user && !isPublicPath) {
    return NextResponse.redirect(
      new URL(
        `/login${path === "/" ? "" : `?next=${encodeURIComponent(fullPath)}`}`,
        req.url,
      ),
    );
  }

  // If there's a user
  if (user) {
    // Handle onboarding for new users
    const isNewUser = new Date(user.createdAt).getTime() > Date.now() - 60 * 60 * 24 * 1000;
    const hasDefaultWorkspace = await getDefaultWorkspace(user);
    const onboardingStep = await getOnboardingStep(user);

    // If user needs onboarding
    if (isNewUser &&
      !isWorkspaceInvite &&
      !path.startsWith("/onboarding") &&
      !hasDefaultWorkspace &&
      onboardingStep !== "completed") {

      // Allow access if already on onboarding path
      if (path.startsWith("/onboarding")) {
        return NextResponse.rewrite(new URL(`/app.dub.co${fullPath}`, req.url));
      }

      // If no onboarding step is set, start from beginning
      if (!onboardingStep) {
        return NextResponse.redirect(new URL("/onboarding/welcome", req.url));
      }

      // If onboarding is completed but no workspace, go to workspace creation
      if (onboardingStep === "completed" && !hasDefaultWorkspace) {
        return NextResponse.redirect(new URL("/onboarding/workspace", req.url));
      }

      // For any other case, continue with normal onboarding flow
      return NextResponse.redirect(
        new URL(`/onboarding/${onboardingStep || "workspace"}`, req.url)
      );
    }

    // Handle /new path
    if (path === "/new") {
      return NewLinkMiddleware(req, user);
    }

    // Handle main routes that need workspace redirects
    if (
      [
        "/",
        "/login",
        "/register",
        "/workspaces",
        "/analytics",
        "/events",
        "/programs",
        "/settings",
        "/upgrade",
        "/wrapped",
      ].includes(path) ||
      path.startsWith("/settings/") ||
      isTopLevelSettingsRedirect(path)
    ) {
      return WorkspacesMiddleware(req, user);
    }

    // Handle any app redirects
    if (appRedirect(path)) {
      return NextResponse.redirect(new URL(appRedirect(path), req.url));
    }
  }

  // For everything else, rewrite to app path
  return NextResponse.rewrite(new URL(`/app.dub.co${fullPath}`, req.url));
}
