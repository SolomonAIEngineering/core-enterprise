import React from 'react'
import { getOrganizationOrNotFound } from '@/utils/customerPortal'
import { getServerSideAPI } from '@/utils/api/serverside'
export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ organization: string }>
  children: React.ReactNode
}) {
  const api = getServerSideAPI()
  const { organization: organizationSlug } = await params
  await getOrganizationOrNotFound(api, organizationSlug)

  return (
    <div className="dark:bg-polar-950 h-full bg-white dark:text-white">
      {children}
    </div>
  )
}
