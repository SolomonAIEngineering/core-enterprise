import { CheckoutConfirmation } from '@/components/Checkout/CheckoutConfirmation'
import CheckoutLayout from '@/components/Checkout/CheckoutLayout'
import { CheckoutStatus } from '@polar-sh/sdk'
import { getCheckoutByClientSecret } from '@/utils/checkout'
import { getServerSideAPI } from '@/utils/api/serverside'
import { redirect } from 'next/navigation'

export default async function Page({
  params: { clientSecret },
  searchParams: { embed, theme, customer_session_token },
}: {
  params: { clientSecret: string }
  searchParams: {
    embed?: string
    theme?: 'light' | 'dark'
    customer_session_token?: string
  }
}) {
  const api = getServerSideAPI()

  const checkout = await getCheckoutByClientSecret(api, clientSecret)

  if (checkout.status === CheckoutStatus.OPEN) {
    redirect(checkout.url)
  }

  return (
    <CheckoutLayout checkout={checkout} embed={embed === 'true'} theme={theme}>
      <CheckoutConfirmation
        checkout={checkout}
        organization={checkout.organization}
        customerSessionToken={customer_session_token}
      />
    </CheckoutLayout>
  )
}
