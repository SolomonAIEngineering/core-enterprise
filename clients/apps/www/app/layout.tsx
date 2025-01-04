import "./css/style.css";
import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/footer";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import Header from "@/components/ui/header";
import { PHProvider } from "./providers";
import PostHogPageViewWrapper from "./components/PostHogPageViewWrapper";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <PHProvider>
        <body
          className={
            "bg-background font-sans tracking-tight text-gray-900 antialiased"
          }
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <PostHogPageViewWrapper />
            <div className="flex min-h-screen flex-col overflow-hidden">
              <Header />
              {children}
              <Footer />
              <Toaster position="bottom-right" richColors />
              <Analytics />
              <SpeedInsights />
            </div>
          </ThemeProvider>
          <Analytics />
        </body>
      </PHProvider>
    </html>
  );
}
