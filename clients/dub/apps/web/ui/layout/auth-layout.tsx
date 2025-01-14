import { BusinessConfig as platform } from "@dub/platform-config";
import { ClientOnly } from "@dub/ui";
import { Suspense } from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen">
      <div className="flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <ClientOnly className="flex w-full flex-col items-center justify-center">
            <Suspense>{children}</Suspense>
          </ClientOnly>
        </div>

        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 text-center">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} {platform.company}, Inc.
          </p>
          <div className="mt-2 flex justify-center gap-3 text-xs text-gray-500 underline underline-offset-2">
            <a
              href={`${platform.webUrl}/legal/privacy`}
              target="_blank"
              className="hover:text-gray-800"
              rel="noreferrer"
            >
              Privacy Policy
            </a>
            <a
              href={`${platform.webUrl}/legal/terms`}
              target="_blank"
              className="hover:text-gray-800"
              rel="noreferrer"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
