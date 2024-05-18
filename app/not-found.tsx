'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import notFound from '@/public/general/images/not-found.svg'
import { ClassNameValue } from 'tailwind-merge'
import { cn } from '@/lib/utils'

export const NotFoundPage = ({ className }: { className?: ClassNameValue }) => {
  const router = useRouter()

  return (
    <div
      className={cn(
        'h-screen w-full flex items-center justify-center flex-col bg-muted bg-gradient-to-r from-primary/20 to-fuchsia-900/20 backdrop-blur-sm',
        className,
      )}
    >
      <Image
        src={notFound}
        alt="not found"
        width="0"
        loading="eager"
        height="0"
        className="w-[20rem] h-auto"
      />
      <h1 className="font-medium text-foreground">
        Oops, We can&apos;t find the Page you&apos;re looking for.
      </h1>
      <Button
        className="mt-5 mb-5 rounded-full px-6"
        onClick={() => router.back()}
      >
        Back to previous Page
      </Button>
    </div>
  )
}

const NotFound = () => <NotFoundPage />

export default NotFound
