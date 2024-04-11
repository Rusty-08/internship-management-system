'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export const NotFoundPage = () => {
  const router = useRouter()

  return (
    <div className="h-screen w-full flex items-center justify-center flex-col">
      <Image
        src={'/general/images/not-found.svg'}
        alt="not found"
        width="0"
        loading="eager"
        height="0"
        className="w-[20rem] h-auto"
      />
      <h1 className="font-medium text-muted-foreground">
        Oops, We can&apos;t find the Page you&apos;re looking for.
      </h1>
      <Button className="mt-5" onClick={() => router.back()}>
        Back to previous Page
      </Button>
    </div>
  )
}

const NotFound = () => <NotFoundPage />

export default NotFound
