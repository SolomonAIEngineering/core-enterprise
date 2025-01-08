import { redirect } from 'next/navigation'

export default async function Page({
  params,
}: {
  params: Promise<{ organization: string }>
}) {
  const { organization: organizationSlug } = await params
  redirect(`/${organizationSlug}`)
}

