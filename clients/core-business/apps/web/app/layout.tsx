import "@/styles/globals.css";

import { geistMono, inter, satoshi } from "@/styles/fonts";
import { cn, constructMetadata } from "@dub/utils";

import RootProviders from "./providers";

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(satoshi.variable, inter.variable, geistMono.variable)}
    >
      <head>
        <script src="https://unpkg.com/react-scan/dist/auto.global.js" async />
        {/* rest of your scripts go under */}
      </head>
      <body>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
