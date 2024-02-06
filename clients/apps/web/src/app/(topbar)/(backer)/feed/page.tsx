'use client'

import {
  CreatePostUpsell,
  GitHubAuthUpsell,
  MaintainerUpsell,
} from '@/components/Dashboard/Upsell'
import { FeaturedCreators } from '@/components/Feed/FeaturedCreators'
import { Feed } from '@/components/Feed/Feed'
import { MySubscriptions } from '@/components/Feed/MySubscriptions'
import { useAuth, useGitHubAccount, usePersonalOrganization } from '@/hooks'
import {
  useListAdminOrganizations,
  useSearchArticles,
  useUserSubscriptions,
} from 'polarkit/hooks'

export default function Page() {
  const { currentUser, authenticated } = useAuth()
  const { data: hasAdminData } = useListAdminOrganizations()
  const personalOrg = usePersonalOrganization()

  const userSubscriptions = useUserSubscriptions(
    currentUser?.id,
    undefined,
    9999,
  )

  const posts = useSearchArticles(personalOrg?.name ?? '')
  const shouldShowPostUpsell =
    !!hasAdminData &&
    !!personalOrg &&
    (posts.data?.pages.flatMap((page) => page.items).length ?? 0) < 1

  const githubAccount = useGitHubAccount()
  const shouldShowGitHubAuthUpsell = authenticated && !githubAccount

  const listOrganizationQuery = useListAdminOrganizations()

  const shouldShowMaintainerUpsell =
    authenticated && !listOrganizationQuery.isLoading && !personalOrg

  const subscriptionsToRender = userSubscriptions.data?.items ?? []

  return (
    <div className="relative flex h-full flex-col justify-center md:flex-row md:gap-x-24 md:pt-6">
      <div className="flex w-full flex-col gap-y-8 pb-12 md:max-w-xl">
        <Feed />
      </div>
      <div className="flex h-full flex-col gap-y-12 self-stretch md:max-w-xs">
        {shouldShowGitHubAuthUpsell ? (
          <GitHubAuthUpsell />
        ) : shouldShowMaintainerUpsell ? (
          <MaintainerUpsell />
        ) : shouldShowPostUpsell ? (
          <CreatePostUpsell />
        ) : null}
        <FeaturedCreators />
        {subscriptionsToRender.length > 0 && (
          <MySubscriptions subscriptions={subscriptionsToRender} />
        )}
      </div>
    </div>
  )
}
