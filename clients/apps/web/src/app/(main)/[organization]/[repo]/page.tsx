import {
  FilterSearchParams,
  buildFundingFilters,
  urlSearchFromObj,
} from '@/components/Organization/filters'
import { ListResourceIssueFunding, Organization } from '@polar-sh/sdk'
import { notFound, redirect } from 'next/navigation'

import ClientPage from './ClientPage'
import { Metadata } from 'next'
import type { SuccessResult } from 'open-graph-scraper-lite'
import { getServerSideAPI } from '@/utils/api/serverside'
import { getUserOrganizations } from '@/utils/user'
import { organizationPageLink } from '@/utils/nav'
import { resolveRepositoryPath } from '@/utils/repository'

type OgObject = SuccessResult['result']

const cacheConfig = {
  next: {
    revalidate: 30, // 30 seconds
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ organization: string; repo: string }>
}): Promise<Metadata> {
  const { organization: organizationSlug, repo: repoSlug } = await params
  const api = getServerSideAPI()
  const resolvedRepositoryOrganization = await resolveRepositoryPath(
    api,
    organizationSlug,
    repoSlug,
    cacheConfig,
  )

  if (!resolvedRepositoryOrganization) {
    notFound()
  }

  const [repository, organization] = resolvedRepositoryOrganization

  if (organization.slug !== organizationSlug) {
    redirect(organizationPageLink(organization, repository.name))
  }

  const orgrepo = `${organization.slug}/${repository.name}`

  return {
    title: `${orgrepo}`, // " | Polar is added by the template"
    description: repository.description || `${orgrepo} on Polar`,
    openGraph: {
      title: `${orgrepo} seeks funding for issues`,
      description: `${orgrepo} seeks funding for issues on Polar`,
      type: 'website',
      images: [
        {
          url: `https://polar.sh/og?org=${organization.slug}&repo=${repository.name}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      images: [
        {
          url: `https://polar.sh/og?org=${organization.slug}&repo=${repository.name}`,
          width: 1200,
          height: 630,
          alt: `${orgrepo} seeks funding for issues`,
        },
      ],
      card: 'summary_large_image',
      title: `${orgrepo} seeks funding for issues`,
      description: `${orgrepo} seeks funding for issues on Polar`,
    },
  }
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ organization: string; repo: string }>
  searchParams: Promise<FilterSearchParams>
}) {
  const api = getServerSideAPI()
  const { organization: organizationSlug, repo: repoSlug } = await params
  const resolvedSearchParams = await searchParams
  const resolvedRepositoryOrganization = await resolveRepositoryPath(
    api,
    organizationSlug,
    repoSlug,
    {
      ...cacheConfig,
      next: {
        ...cacheConfig.next,
        // Make it possible to revalidate the page when the repository is updated from client
        tags: [`repository:${organizationSlug}/${repoSlug}`],
      },
    },
  )

  if (!resolvedRepositoryOrganization) {
    notFound()
  }

  const [repository, organization] = resolvedRepositoryOrganization

  if (organization.slug !== organizationSlug) {
    redirect(organizationPageLink(organization, repository.name))
  }

  const userOrganizations = await getUserOrganizations(api)

  const filters = buildFundingFilters(urlSearchFromObj(resolvedSearchParams))

  let issuesFunding: ListResourceIssueFunding | undefined

  try {
    issuesFunding = await api.funding.search(
      {
        organizationId: organization.id,
        repositoryName: repoSlug,
        query: filters.q,
        sorting: filters.sort,
        badged: filters.badged,
        limit: 20,
        closed: filters.closed,
        page: resolvedSearchParams.page ? parseInt(resolvedSearchParams.page) : 1,
      },
      cacheConfig,
    )
  } catch (e) {
    notFound()
  }

  const featuredOrganizations: Organization[] = []
  const links: { opengraph: OgObject; url: string }[] = []

  return (
    <ClientPage
      organization={organization}
      repository={repository}
      issuesFunding={issuesFunding}
      featuredOrganizations={featuredOrganizations}
      userOrganizations={userOrganizations}
      links={links}
    />
  )
}
