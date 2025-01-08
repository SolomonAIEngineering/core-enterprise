import Button from 'polarkit/components/ui/atoms/button'
import Link from 'next/link'
import LogoType70 from '@/components/Brand/LogoType70'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ message: string; return_to: string }>
}) {
  const { message, return_to } = await searchParams

  return (
    <div className="dark:bg-polar-950 flex h-screen w-full grow items-center justify-center bg-gray-50">
      <div id="polar-bg-gradient" />
      <div className="flex w-80 flex-col items-center gap-6 text-center">
        <LogoType70 className="h-10" />
        <h1 className="text-3xl">Oh no!</h1>
        <p>{message}</p>
        <Button asChild>
          <Link href={return_to}>Go back</Link>
        </Button>
      </div>
    </div>
  )
}
