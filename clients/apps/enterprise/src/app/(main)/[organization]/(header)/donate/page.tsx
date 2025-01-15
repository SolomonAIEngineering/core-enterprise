import { notFound, redirect } from 'next/navigation'

import { Metadata } from 'next'
import { getServerSideAPI } from '@/utils/api/serverside'
import { getStorefrontOrNotFound } from '@/utils/storefront'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ organization: string }>
}): Promise<Metadata> {
  const api = getServerSideAPI()
  const { organization: organizationSlug } = await params
  const { organization } = await getStorefrontOrNotFound(
    api,
    organizationSlug,
  )

  return {
    title: `Donate to ${organization.name}`, // " | Polar is added by the template"
    description: `Donate to ${organization.name}`,
    openGraph: {
      title: `Donate to ${organization.name}`,
      description: `Donate to ${organization.name}`,
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
          alt: `Donate to ${organization.name}`,
        },
      ],
      card: 'summary_large_image',
      title: `Donate to ${organization.name}`,
      description: `Donate to ${organization.name}`,
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ organization: string }>
}) {
  const { organization: organizationSlug } = await params
  const api = getServerSideAPI()
  const { organization, donation_product } = await getStorefrontOrNotFound(
    api,
    organizationSlug,
  )
  if (donation_product) {
    redirect(`/${organization.slug}/products/${donation_product.id}`)
  }
  notFound()
}