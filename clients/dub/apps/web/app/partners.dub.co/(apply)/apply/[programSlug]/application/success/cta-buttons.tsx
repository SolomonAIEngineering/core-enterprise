"use client";

import { BusinessConfig as platform } from "@dub/platform-config";
import { Button } from "@dub/ui";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export function CTAButtons() {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <>
      <Button
        type="button"
        text={
          status === "authenticated"
            ? `Continue to ${platform.company} Partners`
            : `Create your ${platform.company} account`
        }
        className="border-[var(--brand)] bg-[var(--brand)] hover:bg-[var(--brand)] hover:ring-[var(--brand-ring)]"
        onClick={() =>
          router.push(status === "authenticated" ? "/" : "/register")
        }
      />
      {status === "unauthenticated" && (
        <Button
          type="button"
          variant="secondary"
          text={`Log in to ${platform.company} Partners`}
          onClick={() => router.push("/login")}
        />
      )}
    </>
  );
}
