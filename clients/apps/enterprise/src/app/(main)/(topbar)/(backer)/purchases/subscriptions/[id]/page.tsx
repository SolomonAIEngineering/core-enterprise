import { CustomerSubscription, ResponseError } from '@polar-sh/sdk'

import ClientPage from './ClientPage'
import { getServerSideAPI } from '@/utils/api/serverside'
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const api = getServerSideAPI()
  const { id } = await params

  let subscription: CustomerSubscription

  try {
    subscription = await api.customerPortalSubscriptions.get({ id })
  } catch (e) {
    if (e instanceof ResponseError && e.response.status === 404) {
      notFound()
    } else {
      throw e
    }
  }

  return <ClientPage subscription={subscription} />
}
