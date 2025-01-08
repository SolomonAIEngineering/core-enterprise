import {
  FilterSearchParams,
  buildFundingFilters,
  urlSearchFromObj,
} from '@/components/Organization/filters'

import ClientPage from './ClientPage'
import type { Metadata } from 'next'
import { getServerSideAPI } from '@/utils/api/serverside'
import { getStorefrontOrNotFound } from '@/utils/storefront'

const cacheConfig = {
  next: {
    revalidate: 30, // 30 seconds
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ organization: string }>
}): Promise<Metadata> {
  const { organization: organizationSlug } = await params
  const api = getServerSideAPI()
  const { organization } = await getStorefrontOrNotFound(
    api,
    organizationSlug,
  )

  return {
    title: `${organization.name}`, // " | Polar is added by the template"
    openGraph: {
      title: `${organization.name} seeks funding for issues`,
      description: `${organization.name} seeks funding for issues on Polar`,
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
          alt: `${organization.name} seeks funding for issues`,
        },
      ],
      card: 'summary_large_image',
      title: `${organization.name} seeks funding for issues`,
      description: `${organization.name} seeks funding for issues on Polar`,
    },
  }
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ organization: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { organization: organizationSlug } = await params
  const resolvedSearchParams = await searchParams as FilterSearchParams
  const api = getServerSideAPI()
  const { organization } = await getStorefrontOrNotFound(
    api,
    organizationSlug,
  )

  const filters = buildFundingFilters(urlSearchFromObj(resolvedSearchParams))

  const issues = await api.funding.search(
    {
      organizationId: organization.id,
      query: filters.q,
      sorting: filters.sort,
      badged: filters.badged,
      limit: 20,
      closed: filters.closed,
      page: resolvedSearchParams.page ? parseInt(resolvedSearchParams.page) : 1,
    },
    cacheConfig,
  )

  return <ClientPage organization={organization} issues={issues} />
}
