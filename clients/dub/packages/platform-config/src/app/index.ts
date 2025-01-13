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
  logo: "https://assets.dub.co/logo.png",
  qrLogo: "https://assets.dub.co/logo.png",
  wordmark: "https://assets.dub.co/wordmark.png",
  thumbnail: "https://assets.dub.co/thumbnail.jpg",
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
    default: "Yoan from Vector <yoan@getvector.app>",
    support: "Vector Support <support@getvector.app>",
    sales: "Vector Sales <sales@getvector.app>",
    billing: "Vector Billing <billing@getvector.app>",
    notifications: "Vector Notifications <notifications@getvector.app>",
    system: "Vector <system@getvector.app>",
  },
  replyTo: "support@getvector.app",
  templates: {
    welcome: "welcome-template",
    passwordReset: "password-reset-template",
    teamInvite: "team-invite-template",
    dealAlert: "deal-alert-template",
    revenueReport: "revenue-report-template",
  },
};

const sharedTitle = "Vector - Revenue Intelligence Platform";
const sharedDescription =
  "Vector - AI-powered intelligence platform for high-performing revenue teams.";
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
  corsOrigins: ["https://app.getvector.app", "https://getvector.app"],
  rateLimiting: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100, // limit each IP to 100 requests per windowMs
  },
  contentSecurityPolicy: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'", "https://js.intercomcdn.com"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:", "https:"],
    connectSrc: ["'self'", "https://api.getvector.app", "https://engine.vector-platform.com"],
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
  baseUrl: ENV.IS_PROD ? "https://api.getvector.app/v1" : "https://api-staging.getvector.app/v1",
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
 * Configuration object for the Vector revenue intelligence platform.
 *
 * This configuration defines platform-wide settings, pricing plans, navigation, metadata, and revenue intelligence
 * features for Vector, a platform designed to empower revenue teams with AI-powered insights and intelligence.
 *
 * The platform helps revenue teams optimize their pipeline, forecast accurately, and make data-driven decisions
 * through advanced analytics, AI-powered insights, and real-time intelligence capabilities.
 */
export const BusinessConfig: SiteConfig = {
  platformHost: "app.getvector.app",
  company: "Vector",
  name: "Vector | Revenue Intelligence Platform",
  founder: "Yoan From Vector",
  founderFirstName: "Yoan",
  address: companyAddress,
  assets: assetUrls,
  email: emailConfig,
  title: sharedTitle,
  description: platformDescription,
  domain: "getvector.app",
  platformUrl: "https://app.getvector.app",
  webUrl: "https://getvector.app",
  securityUrl: "https://security.getvector.app",
  partnersUrl: "https://partners.getvector.app",
  referralUrl: "https://referral.getvector.app",
  statusPageUrl: "https://status.getvector.app",
  apiUrl: "https://api.getvector.app",
  desktopUrl: "vector://",
  dubProjectSlug: "vector",
  mfaIssuer: "app.getvector.app",
  uptimeUrl: "https://vector.betteruptime.com/",
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
    twitter: "https://twitter.com/vector",
    github: "https://github.com/vector",
    docs: "https://docs.vector.app",
    youtube: "https://www.youtube.com/vector",
  },
  supportEmail: "support@getvector.app",
  helpUrl: "https://help.getvector.app",
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
    metadataBase: new URL("https://app.getvector.app"),
    ...sharedMetadata,
    twitter: sharedMetadata,
    openGraph: {
      ...sharedMetadata,
      url: "https://app.getvector.app",
      siteName: "Vector",
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
    baseUrlProd: "https://engine.vector-platform.com",
    baseUrlDev: "https://engine-staging.vector-platform.com",
    bearerToken: "VECTOR_API_TOKEN",
  },
  termsAndConditionsUrl: "https://getvector.app/terms",
  privacyPolicyUrl: "https://getvector.app/privacy",
  documentationUrl: "https://docs.getvector.app",
  security: securityConfig,
  analytics: analyticsConfig,
  api: apiConfig,
  features: activeFeatureFlags,
};

export type { ENV };
