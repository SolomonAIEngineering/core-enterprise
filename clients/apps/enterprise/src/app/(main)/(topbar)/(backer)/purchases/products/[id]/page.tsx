import { CustomerOrder, ResponseError } from '@polar-sh/sdk'

import ClientPage from './ClientPage'
import { getServerSideAPI } from '@/utils/api/serverside'
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const api = getServerSideAPI()
  const { id } = await params

  let order: CustomerOrder

  try {
    order = await api.customerPortalOrders.get({ id: id })
  } catch (e) {
    if (e instanceof ResponseError && e.response.status === 404) {
      notFound()
    } else {
      throw e
    }
  }

  return <ClientPage order={order} />
}
