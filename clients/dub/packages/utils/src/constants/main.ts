import { BusinessConfig as platform } from "@dub/platform-config";

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || platform.company;

export const SHORT_DOMAIN =
  process.env.NEXT_PUBLIC_APP_SHORT_DOMAIN || "dub.sh";

export const HOME_DOMAIN = `https://${platform.domain}`;

export const APP_HOSTNAMES = new Set([
  `app.${platform.domain}`,
  `preview.${platform.domain}`,
  "localhost:8888",
  "localhost",
]);

export const APP_DOMAIN =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? `https://app.${platform.domain}`
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
      ? `https://preview.${platform.domain}`
      : "http://localhost:8888";

export const APP_DOMAIN_WITH_NGROK =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? `https://app.${platform.domain}`
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
      ? `https://preview.${platform.domain}`
      : process.env.NEXT_PUBLIC_NGROK_URL || "http://localhost:8888";

export const API_HOSTNAMES = new Set([
  `api.${platform.domain}`,
  `api-staging.${platform.domain}`,
  `api.${SHORT_DOMAIN}`,
  "api.localhost:8888",
]);

export const API_DOMAIN =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? `https://api.${platform.domain}`
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
      ? `https://api-staging.${platform.domain}`
      : "http://api.localhost:8888";

export const ADMIN_HOSTNAMES = new Set([
  `admin.${platform.domain}`,
  "admin.localhost:8888",
]);

export const PARTNERS_DOMAIN =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? `https://partners.${platform.domain}`
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
      ? `https://partners-staging.${platform.domain}`
      : "http://partners.localhost:8888";

export const PARTNERS_HOSTNAMES = new Set([
  `partners.${platform.domain}`,
  `partners-staging.${platform.domain}`,
  "partners.localhost:8888",
]);

export const DUB_LOGO = platform.assets.logo;
export const DUB_QR_LOGO = platform.assets.qrLogo;
export const DUB_WORDMARK = platform.assets.wordmark;
export const DUB_THUMBNAIL = platform.assets.thumbnail;

export const DUB_WORKSPACE_ID = "cl7pj5kq4006835rbjlt2ofka";
export const ACME_WORKSPACE_ID = "clrei1gld0002vs9mzn93p8ik";
export const LEGAL_WORKSPACE_ID = "clrflia0j0000vs7sqfhz9c7q";
export const LEGAL_USER_ID = "clqei1lgc0000vsnzi01pbf47";

export const R2_URL = process.env.STORAGE_BASE_URL as string;
