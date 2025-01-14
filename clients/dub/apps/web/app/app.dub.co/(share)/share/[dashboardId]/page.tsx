// import { APP_DOMAIN, constructMetadata } from "@dub/utils";
import { Footer, Nav, NavMobile } from "@dub/ui";

import Analytics from "@/ui/analytics";
import type { PlanProps } from "@/lib/types";
import { Suspense } from "react";
import { getDashboard } from "@/lib/fetchers/get-dashboard";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const runtime = "edge";

// export async function generateMetadata({
//   params,
// }: {
//   params: { dashboardId: string };
// }) {
//   const data = await getDashboard({ id: params.dashboardId });

//   // if the dashboard or link doesn't exist
//   if (!data?.link) {
//     return;
//   }

//   return constructMetadata({
//     title: `Analytics for ${data.link.domain}/${data.link.key} – ${process.env.NEXT_PUBLIC_APP_NAME}`,
//     image: `${APP_DOMAIN}/api/og/analytics?domain=${data.link.domain}&key=${data.link.key}`,
//     noIndex: !data.doIndex,
//   });
// }

export default async function dashboardPage({
  params,
}: {
  params: { dashboardId: string };
}) {
  const data = await getDashboard({ id: params.dashboardId });

  // if the dashboard or link doesn't exist
  if (!data?.link) {
    notFound();
  }

  // if (
  //   data.password &&
  //   cookies().get(`dub_password_${params.dashboardId}`)?.value !== data.password
  // ) {
  //   return (
  //     <main className="flex h-screen w-screen items-center justify-center">
  //       <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
  //         <div className='flex flex-col items-center justify-center space-y-3 border-gray-200 border-b bg-white px-4 py-6 pt-8 text-center sm:px-16'>
  //           <Logo />
  //           <h3 className='font-semibold text-xl'>Enter Password</h3>
  //           <p className='text-gray-500 text-sm'>
  //             This dashboard is password protected. Enter the password to view
  //             the dashboard.
  //           </p>
  //         </div>
  //         <DashboardPasswordForm />
  //       </div>
  //     </main>
  //   );
  // }

  return (
    <div className="flex min-h-screen flex-col justify-between bg-gray-50/80">
      {/* <NavMobile staticDomain="app.dub.co" /> */}
      {/* <Nav staticDomain="app.dub.co" /> */}
      <Suspense fallback={<div className="h-screen w-full bg-gray-50" />}>
        <Analytics
          dashboardProps={{
            domain: data.link.domain,
            key: data.link.key,
            url: data.link.url,
            showConversions: data.showConversions,
            workspacePlan: data.project?.plan as PlanProps,
          }}
        />
      </Suspense>
      {/* <Footer staticDomain="app.oppulence.co" /> */}
    </div>
  );
}
