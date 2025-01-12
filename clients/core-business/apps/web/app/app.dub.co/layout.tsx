"use client";

import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

import { ModalProvider } from "@/ui/modals/modal-provider";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <GoogleAnalytics gaId="G-QTBMHSTT3W" />
      <GoogleTagManager gtmId="GTM-N47BG36P" />
      <ModalProvider>{children}</ModalProvider>
    </SessionProvider>
  );
}
