import { Pledge, ResponseError } from '@polar-sh/sdk'

import Status from '@/components/Pledge/Status'
import { api } from '@/utils/api'
import { notFound } from 'next/navigation'
import { resolveRepositoryPath } from '@/utils/repository'

const cacheConfig = {
  cache: 'no-store',
} as const

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ organization: string; repo: string; number: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { organization: organizationSlug, repo: repoSlug, number: numberSlug } = await params
  const resolvedSearchParams = await searchParams as Record<string, string | string[] | undefined>
  const resolvedRepositoryOrganization = await resolveRepositoryPath(
    api,
    organizationSlug,
    repoSlug,
    cacheConfig,
  )

  if (!resolvedRepositoryOrganization) {
    notFound()
  }

  const [, organization] = resolvedRepositoryOrganization

  const paymentIntentId = resolvedSearchParams.payment_intent_id
  if (typeof paymentIntentId !== 'string') {
    notFound()
  }

  let pledge: Pledge

  try {
    pledge = await api.pledges.create({
      body: {
        payment_intent_id: paymentIntentId,
      },
    })
  } catch (e) {
    if (e instanceof ResponseError) {
      if (e.response.status === 404) {
        notFound()
      }
    }
    throw e
  }

  const email = resolvedSearchParams.email as string | undefined

  // TODO: Handle different statuses than success... #happy-path-alpha-programming

  return <Status pledge={pledge} organization={organization} email={email} />
}
