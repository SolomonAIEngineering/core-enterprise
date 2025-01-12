import CheckoutProductInfo from '@/components/Checkout/CheckoutProductInfo'
import { CheckoutPublic } from '@polar-sh/sdk'
import ClientPage from './ClientPage'
import type { Metadata } from 'next'
import { getServerSideAPI } from '@/utils/api/serverside'
import { getStorefrontOrNotFound } from '@/utils/storefront'
import { headers } from 'next/headers'
import { isCrawler } from '@/utils/crawlers'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ organization: string; productId: string }>
}): Promise<Metadata> {
  const api = getServerSideAPI()
  const { organization: organizationSlug, productId } = await params

  const { organization, products } = await getStorefrontOrNotFound(
    api,
    organizationSlug,
  )
  const product = products.find((p) => p.id === productId)

  if (!product) {
    notFound()
  }

  return {
    title: `${product.name} by ${organization.name}`, // " | Polar is added by the template"
    openGraph: {
      title: `${product.name}`,
      description: `A product from ${organization.name}`,
      siteName: 'Polar',
      type: 'website',
      images: [
        {
          url:
            product.medias[0]?.public_url ??
            `https://polar.sh/og?org=${organization.slug}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      images: [
        {
          url:
            product.medias[0]?.public_url ??
            `https://polar.sh/og?org=${organization.slug}`,
          width: 1200,
          height: 630,
          alt: `${product.name}`,
        },
      ],
      card: 'summary_large_image',
      title: `${product.name}`,
      description: `A product from ${organization.name}`,
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ organization: string; productId: string }>
}) {
  const { organization: organizationSlug, productId } = await params
  const api = getServerSideAPI()
  const { organization, products } = await getStorefrontOrNotFound(
    api,
    organizationSlug,
  )
  const product = products.find((p) => p.id === productId)

  if (!product) {
    notFound()
  }

  /* Avoid creating a checkout for crawlers, just render a simple product info page */
  const headersList = await headers()
  const userAgent = headersList.get('user-agent')
  if (userAgent && isCrawler(userAgent)) {
    return <CheckoutProductInfo organization={organization} product={product} />
  }

  const checkout: CheckoutPublic = await api.checkouts.clientCreate({
    body: {
      product_price_id: product.prices[0].id,
    },
  })

  return <ClientPage checkout={checkout} organization={organization} />
}
