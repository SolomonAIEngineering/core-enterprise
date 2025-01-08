import { DataTableSearchParams, parseSearchParams } from '@/utils/datatable'

import ClientPage from './ClientPage'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Finance - Outgoing`, // " | Polar is added by the template"
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams
  const { pagination, sorting } = parseSearchParams(resolvedParams as DataTableSearchParams, [
    { id: 'created_at', desc: true },
  ])

  return <ClientPage pagination={pagination} sorting={sorting} />
}
