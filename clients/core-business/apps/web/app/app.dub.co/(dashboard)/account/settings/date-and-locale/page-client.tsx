"use client";

import UpdateDateFormat from "@/ui/account/update-date-format";
import UpdateLocale from "@/ui/account/update-locale";
import UpdateTimeFormat from "@/ui/account/update-time-format";
import UpdateTimezone from "@/ui/account/update-timezone";
import UpdateWeekStart from "@/ui/account/update-week-start";
import { useSession } from "next-auth/react";
import useUser from "@/lib/swr/use-user";

export default function SettingsDateAndLocalePageClient() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="flex flex-col space-y-6">
      <UpdateLocale currentLocale={user.locale || "en-US"} />
      <UpdateTimezone currentTimezone={user.timezone || "America/New_York"} />
      <UpdateDateFormat currentFormat={user.dateFormat || "MM/DD/YYYY"} />
      <UpdateTimeFormat currentFormat={String(user.timeFormat || "0")} />
      <UpdateWeekStart
        currentWeekStart={user.weekStartsOnMonday ? "monday" : "sunday"}
      />
    </div>
  );
}
