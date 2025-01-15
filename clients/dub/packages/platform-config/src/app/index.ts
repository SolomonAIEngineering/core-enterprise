import type { EmailConfig, SiteConfig } from "../types/types";

import { activeFeatureFlags } from "../features";

// Environment configuration
const ENV = {
  NODE_ENV: typeof process !== "undefined" ? process.env.NODE_ENV || "development" : "development",
  IS_PROD: typeof process !== "undefined" ? process.env.NODE_ENV === "production" : false,
  IS_DEV: typeof process !== "undefined" ? process.env.NODE_ENV === "development" : true,
};

// Asset URLs configuration
const assetUrls = {
  logo: "https://assets.solomon-ai.app/logo.png",
  qrLogo: "https://assets.solomon-ai.app/logo.png",
  wordmark: "https://assets.solomon-ai.app/wordmark.png",
  thumbnail: "https://assets.solomon-ai.app/thumbnail.ppg",
  appleTouchIcon: "https://assets.solomon-ai.app/apple-touch-icon.png",
  favicon32: "https://assets.solomon-ai.app/favicon-32x32.png",
  favicon16: "https://assets.solomon-ai.app/favicon-16x16.png",
  faviconAndroid192: "https://assets.solomon-ai.app/android-chrome-192x192.png",
  faviconAndroid512: "https://assets.solomon-ai.app/android-chrome-512x512.png",
  notFoundLink: "https://assets.solomon-ai.app/notfound.png",
  thankYouThumbnail: "https://assets.solomon-ai.app/thank-you-thumbnail.jpg",
};

// Company address configuration
const companyAddress = {
  street: "101 Avenue of the Americas",
  city: "New York",
  state: "NY",
  zipCode: "10013",
  country: "United States",
  phone: "+1 (424) 234-5678",
};

// Email configuration
const emailConfig: EmailConfig = {
  from: {
    default: "Yoan from Solomon AI <yoan@solomon-ai.app>",
    support: "Solomon AI Support <support@solomon-ai.app>",
    sales: "Solomon AI Sales <sales@solomon-ai.app>",
    billing: "Solomon AI Billing <billing@solomon-ai.app>",
    notifications: "Solomon AI Notifications <notifications@solomon-ai.app>",
    system: "Solomon AI <system@solomon-ai.app>",
    feedback: "Solomon AI Feedback <feedback@solomon-ai.app>",
  },
  replyTo: "support@solomon-ai.app",
  templates: {
    welcome: "welcome-template",
    passwordReset: "password-reset-template",
    teamInvite: "team-invite-template",
    dealAlert: "deal-alert-template",
    revenueReport: "revenue-report-template",
  },
};

const sharedTitle = "Solomon - Revenue Intelligence Platform";
const sharedDescription =
  "Solomon - AI-powered intelligence platform for high-performing revenue teams.";
const platformDescription =
  "the revenue intelligence platform that empowers teams with AI-driven insights, predictive analytics, and automated forecasting to optimize sales performance and maximize revenue growth.";
const sharedImages = [
  { url: "", width: 800, height: 600 },
  { url: "", width: 1800, height: 1600 },
];

const sharedMetadata = {
  title: sharedTitle,
  description: sharedDescription,
  images: sharedImages,
};

const pricingPlans = [
  {
    id: "price_1",
    name: "Growth",
    description: "Perfect for growing revenue teams and startups",
    features: [
      "Revenue analytics",
      "Basic deal intelligence",
      "5 team members",
      "Core revenue insights",
    ],
    monthlyPrice: 1000,
    yearlyPrice: 10000,
    isMostPopular: false,
  },
  {
    id: "price_2",
    name: "Pro",
    description: "For scaling revenue organizations",
    features: [
      "Advanced revenue intelligence",
      "Priority support",
      "Unlimited team members",
      "AI-powered forecasting",
      "Custom integrations",
    ],
    monthlyPrice: 2000,
    yearlyPrice: 20000,
    isMostPopular: true,
  },
  {
    id: "price_5",
    name: "Enterprise",
    description: "Enterprise-grade revenue intelligence for large organizations",
    features: [
      "Custom AI models",
      "24/7 dedicated support",
      "Unlimited team members",
      "Advanced forecasting",
      "Custom integrations",
      "Enterprise security",
    ],
    monthlyPrice: 5000,
    yearlyPrice: 50000,
    isMostPopular: false,
  },
  {
    id: "price_6",
    name: "Ultimate",
    description: "Ultimate revenue intelligence suite for industry leaders",
    features: [
      "Bespoke AI solutions",
      "White-glove support",
      "Unlimited everything",
      "Real-time intelligence",
      "Custom integrations",
      "Highest security tier",
    ],
    monthlyPrice: 8000,
    yearlyPrice: 80000,
    isMostPopular: false,
  },
];

// Enhanced security configuration
const securityConfig = {
  corsOrigins: ["https://app.solomon-ai.app", "https://solomon-ai.app"],
  rateLimiting: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100, // limit each IP to 100 requests per windowMs
  },
  contentSecurityPolicy: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'", "https://js.intercomcdn.com"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:", "https:"],
    connectSrc: ["'self'", "https://api.solomon-ai.app", "https://engine.solomon-ai.app"],
  },
  cookieSettings: {
    secure: ENV.IS_PROD,
    sameSite: "lax" as const,
    httpOnly: true,
  },
};

// Analytics configuration
const analyticsConfig = {
  googleAnalytics: {
    measurementId: "G-XXXXXXXXXX",
    debug: ENV.IS_DEV,
  },
  mixpanel: {
    projectToken: "YOUR_MIXPANEL_TOKEN",
    debug: ENV.IS_DEV,
  },
  segment: {
    writeKey: "YOUR_SEGMENT_WRITE_KEY",
    debug: ENV.IS_DEV,
  },
};

// API configuration
const apiConfig = {
  baseUrl: ENV.IS_PROD ? "https://api.solomon-ai.app/v1" : "https://api-staging.solomon-ai.app/v1",
  timeout: 30000,
  retryAttempts: 3,
  endpoints: {
    auth: "/auth",
    users: "/users",
    analytics: "/analytics",
    billing: "/billing",
  },
};

/**
 * Configuration object for the Solomon AI revenue intelligence platform.
 *
 * This configuration defines platform-wide settings, pricing plans, navigation, metadata, and revenue intelligence
 * features for Solomon AI, a platform designed to empower revenue teams with AI-powered insights and intelligence.
 *
 * The platform helps revenue teams optimize their pipeline, forecast accurately, and make data-driven decisions
 * through advanced analytics, AI-powered insights, and real-time intelligence capabilities.
 */
export const BusinessConfig: SiteConfig = {
  platformHost: "app.solomon-ai.app",
  company: "Solomon AI",
  name: "Solomon AI | Revenue Intelligence Platform",
  shortName: "Solomon AI",
  founder: "Yoan From Solomon AI",
  founderFirstName: "Yoan",
  address: companyAddress,
  assets: assetUrls,
  email: emailConfig,
  title: sharedTitle,
  description: platformDescription,
  domain: "solomon-ai.app",
  platformUrl: "https://app.solomon-ai.app",
  webUrl: "https://solomon-ai.app",
  assetsUrl: "https://assets.solomon-ai.app",
  securityUrl: "https://security.solomon-ai.app",
  partnersUrl: "https://partners.solomon-ai.app",
  referralUrl: "https://referral.solomon-ai.app",
  statusPageUrl: "https://status.solomon-ai.app",
  apiUrl: "https://api.solomon-ai.app",
  desktopUrl: "solomonai://",
  dubProjectSlug: "solomonai",
  mfaIssuer: "app.solomon-ai.app",
  uptimeUrl: "https://solomon.betteruptime.com/",
  /**
   * Navigation items displayed in the main navigation bar.
   *
   * @property {NavItem[]} mainNav - An array of navigation items used in the header.
   */
  mainNav: [
    { title: "Home", href: "/" },
    { title: "Register", href: "/register", showOnAuth: false },
    { title: "Login", href: "/login", showOnAuth: false },
  ],
  /**
   * Social media and external links.
   *
   * @property {Links} links - URLs to external resources such as Twitter, GitHub, and documentation.
   */
  links: {
    twitter: "https://twitter.com/solomon_ai",
    github: "https://github.com/solomon-ai",
    docs: "https://docs.solomon-ai.app",
    youtube: "https://www.youtube.com/solomon-ai",
  },
  supportEmail: "support@solomon-ai.app",
  helpUrl: "https://help.solomon-ai.app",
  intercomAppId: "pezs7zbq",
  /**
   * Payment configuration for managing subscriptions.
   *
   * @property {Payments} payments - Contains links for handling subscriptions based on the environment.
   */
  payments: {
    subscriptionLink: ENV.IS_DEV
      ? "https://buy.stripe.com/test_00gg1O1zNgtffNSeUV"
      : "https://buy.stripe.com/9AQdSf6iPdcdggM000",
  },
  /**
   * Billing configuration for accessing the customer billing portal.
   *
   * @property {Billings} billings - Contains links to the customer billing portal based on the environment.
   */
  billings: {
    customerBillingPortalLink: ENV.IS_DEV
      ? "https://billing.stripe.com/p/login/test_3csdSC6UVbWecsUfYY"
      : "https://billing.stripe.com/p/login/8wM9Btf6j8Gf8Q8000",
  },
  /**
   * Metadata for SEO and social sharing, including Twitter and Open Graph configurations.
   *
   * @property {SiteMetadata} metadata - SEO and social sharing metadata settings for the platform.
   */
  metadata: {
    metadataBase: new URL("https://app.solomon-ai.app"),
    ...sharedMetadata,
    twitter: sharedMetadata,
    openGraph: {
      ...sharedMetadata,
      url: "https://app.solomon-ai.app",
      siteName: "Solomon AI",
      locale: "en_US",
      type: "website",
    },
  },
  /**
   * Viewport configuration for responsive design.
   *
   * @property {Viewport} viewport - Defines viewport settings such as width, scale, and theme colors.
   */
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: [
      { media: "(prefers-color-scheme: light)" },
      { media: "(prefers-color-scheme: dark)" },
    ],
  },
  /**
   * Pricing plans available for different business needs.
   *
   * @property {PricingPlan[]} pricing - An array of pricing plans, each tailored to specific business types.
   */
  pricing: pricingPlans,
  /**
   * Financial engine configuration for accessing AI-powered analytics.
   *
   * @property {FinancialEngineConfig} financialEngine - The configuration for connecting to the financial engine, including production and development URLs.
   */
  financialEngine: {
    baseUrlProd: "https://engine.solomon-ai.app",
    baseUrlDev: "https://engine-staging.solomon-ai.app",
    bearerToken: "SOLOMON_API_TOKEN",
  },
  termsAndConditionsUrl: "https://solomon-ai.app/terms",
  privacyPolicyUrl: "https://solomon-ai.app/privacy",
  documentationUrl: "https://docs.solomon-ai.app",
  security: securityConfig,
  analytics: analyticsConfig,
  api: apiConfig,
  features: activeFeatureFlags,
};

export type { ENV };
