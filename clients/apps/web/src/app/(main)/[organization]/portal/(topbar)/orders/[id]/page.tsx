import { CustomerOrder, ResponseError } from '@polar-sh/sdk'

import ClientPage from './ClientPage'
import type { Metadata } from 'next'
import { getOrganizationOrNotFound } from '@/utils/customerPortal'
import { getServerSideAPI } from '@/utils/api/serverside'
import { redirect } from 'next/navigation'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ organization: string }>
}): Promise<Metadata> {
  const api = getServerSideAPI()
  const { organization: organizationSlug } = await params
  const organization = await getOrganizationOrNotFound(api, organizationSlug)

  return {
    title: `Customer Portal | ${organization.name}`, // " | Polar is added by the template"
    openGraph: {
      title: `Customer Portal | ${organization.name} on Polar`,
      description: `Customer Portal | ${organization.name} on Polar`,
      siteName: 'Polar',
      type: 'website',
      images: [
        {
          url: `https://polar.sh/og?org=${organization.slug}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      images: [
        {
          url: `https://polar.sh/og?org=${organization.slug}`,
          width: 1200,
          height: 630,
          alt: `${organization.name} on Polar`,
        },
      ],
      card: 'summary_large_image',
      title: `Customer Portal | ${organization.name} on Polar`,
      description: `Customer Portal | ${organization.name} on Polar`,
    },
  }
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ organization: string; id: string }>
  searchParams: Promise<{ customer_session_token?: string }>
}) {
  const { organization: organizationSlug, id: orderId } = await params
  const resolvedSearchParams = await searchParams
  const { customer_session_token } = resolvedSearchParams
  const api = getServerSideAPI(customer_session_token)
  const organization = await getOrganizationOrNotFound(api, organizationSlug)

  let order: CustomerOrder | undefined
  try {
    order = await api.customerPortalOrders.get({ id: orderId })
  } catch (e) {
    if (e instanceof ResponseError && e.response.status === 401) {
      redirect(`/${organization.slug}/portal/request`)
    } else {
      throw e
    }
  }

  return (
    <ClientPage
      organization={organization}
      order={order}
      customerSessionToken={resolvedSearchParams.customer_session_token}
    />
  )
}
