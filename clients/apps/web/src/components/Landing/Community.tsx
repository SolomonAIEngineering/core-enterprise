'use client'

import { Language, TrendingUpOutlined } from '@mui/icons-material'
import GitHubIcon from '../Icons/GitHubIcon'
import FeatureItem from './molecules/FeatureItem'

export const Community = () => {
  return (
    <div key="section-community" className="flex flex-col gap-y-24 md:gap-y-32">
      <div className="relative flex flex-col items-center gap-y-4 text-center">
        <h2 className="text-2xl leading-snug md:text-5xl">
          Grow community alongside transactions
        </h2>
        <h3 className="dark:text-polar-600 text-xl leading-snug text-gray-500 md:text-4xl">
          Crucial for successful developer tools. So it&apos;s built-in - for
          free
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <FeatureItem
          icon={<Language />}
          title="Polar Page"
          description="Social bio links for developers. Showcase your repos, products, subscriptions, newsletter and more."
          link="https://polar.sh/polarsource"
          linkDescription="Checkout our Polar Page"
        />
        <FeatureItem
          icon={<TrendingUpOutlined />}
          title="Free & Premium Newsletters"
          description="Online- and email newsletters for your community. Write in GitHub flavoured markdown & share them with all subscribers."
          link="/newsletters"
        />
        <FeatureItem
          icon={<GitHubIcon width={20} height={20} />}
          title="Official GitHub Option"
          description="GitHub offers first-class support for Polar Pages in FUNDING.yaml. Convert stars into community members."
          link="https://polar.sh/polarsource/posts/github-supports-polar-in-funding-yaml"
          linkDescription="Read announcement"
        />
      </div>
    </div>
  )
}
