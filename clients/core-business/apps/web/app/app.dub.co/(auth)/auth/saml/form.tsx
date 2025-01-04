"use client";

import { signIn } from "next-auth/react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

// To handle the IdP initiated login flow callback
export default function SAMLForm() {
  const searchParams = useSearchParams();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const code = searchParams?.get("code");

    signIn("saml-idp", {
      callbackUrl: "/",
      code,
    });
  }, []);

  return null;
}
