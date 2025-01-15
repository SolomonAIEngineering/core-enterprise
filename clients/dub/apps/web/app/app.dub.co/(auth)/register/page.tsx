import { APP_DOMAIN, constructMetadata } from "@dub/utils";

import { AuthLayout } from "@/ui/layout/auth-layout";
import { BusinessConfig as platform } from "@dub/platform-config";
import RegisterPageClient from "./page-client";

export const metadata = constructMetadata({
  title: `Create your ${platform.company} account`,
  canonicalUrl: `${APP_DOMAIN}/register`,
});

export default function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterPageClient />
    </AuthLayout>
  );
}
