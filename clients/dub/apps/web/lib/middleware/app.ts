import { NextRequest, NextResponse } from "next/server";

import { parse } from "@/lib/middleware/utils";
import EmbedMiddleware from "./embed";
import NewLinkMiddleware from "./new-link";
import { appRedirect } from "./utils/app-redirect";
import { getDefaultWorkspace } from "./utils/get-default-workspace";
import { getOnboardingStep } from "./utils/get-onboarding-step";
import { getUserViaToken } from "./utils/get-user-via-token";
import { isTopLevelSettingsRedirect } from "./utils/is-top-level-settings-redirect";
import WorkspacesMiddleware from "./workspaces";

export default async function AppMiddleware(req: NextRequest) {
  const { path, fullPath } = parse(req);
  console.log("Current path:", path);

  if (path.startsWith("/embed")) {
    return EmbedMiddleware(req);
  }

  const user = await getUserViaToken(req);
  console.log("User authenticated:", !!user);

  if (path === "/onboarding" || path === "/onboarding/workspace") {
    console.log("Allowing direct onboarding access");
    return NextResponse.rewrite(new URL(`/app.dub.co${fullPath}`, req.url));
  }

  // Handle non-authenticated users
  if (!user) {
    const publicPaths = [
      "/login",
      "/forgot-password",
      "/register",
      "/auth/saml",
    ];
    const isPublicPath =
      publicPaths.includes(path) ||
      path.startsWith("/auth/reset-password/") ||
      path.startsWith("/share/");

    if (!isPublicPath) {
      console.log("Redirecting non-auth user to login");
      return NextResponse.redirect(
        new URL(
          `/login${path === "/" ? "" : `?next=${encodeURIComponent(fullPath)}`}`,
          req.url,
        ),
      );
    }
    return NextResponse.rewrite(new URL(`/app.dub.co${fullPath}`, req.url));
  }

  // Handle authenticated users
  const isNewUser =
    new Date(user.createdAt).getTime() > Date.now() - 60 * 60 * 24 * 1000;
  const defaultWorkspace = await getDefaultWorkspace(user);
  const onboardingStep = await getOnboardingStep(user);

  console.log({
    isNewUser,
    hasDefaultWorkspace: !!defaultWorkspace,
    onboardingStep,
    currentPath: path,
  });

  // Direct to onboarding if needed
  if (isNewUser && !defaultWorkspace && onboardingStep !== "completed") {
    if (!path.startsWith("/onboarding")) {
      console.log("Redirecting to onboarding");
      return NextResponse.redirect(new URL("/onboarding/workspace", req.url));
    }
  }

  // Handle specific paths for authenticated users
  if (path === "/new") {
    return NewLinkMiddleware(req, user);
  }

  // Handle main routes
  const mainRoutes = [
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
  ];

  if (
    mainRoutes.includes(path) ||
    path.startsWith("/settings/") ||
    isTopLevelSettingsRedirect(path)
  ) {
    console.log("Handling workspace middleware");
    return WorkspacesMiddleware(req, user);
  }

  if (appRedirect(path)) {
    return NextResponse.redirect(new URL(appRedirect(path), req.url));
  }

  // Default rewrite
  return NextResponse.rewrite(new URL(`/app.dub.co${fullPath}`, req.url));
}
