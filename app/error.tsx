'use client'

import { Button } from '@/components/ui/button'
import errorImage from '@/public/general/images/error.svg'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex h-screen items-center justify-center flex-col bg-muted bg-gradient-to-r from-primary/20 to-fuchsia-900/20 backdrop-blur-sm">
      <Image
        src={errorImage}
        alt="not found"
        width="0"
        loading="eager"
        height="0"
        className="w-[20rem] h-auto"
      />
      <h2 className="text-2xl font-bold">Oops!, Something went wrong!</h2>
      <div className="space-x-2 my-4">
        <Button onClick={() => router.back()} variant="outline">
          Go Back
        </Button>
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </Button>
      </div>
    </div>
  )
}
