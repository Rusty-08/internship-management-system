'use client'

import { Button } from '@/components/ui/button'
import useMediaQuery from '@/hooks/useMediaQuery'
import Link from 'next/link'
import React from 'react'

export const ViewMore = ({ navigate }: { navigate: string }) => {
  const isMobile = useMediaQuery('(max-width: 599px)')

  if (isMobile) {
    return (
      <Link href={navigate}>
        <Button className='flex gap-2 md:hidden w-full' variant='secondary'>
          View More
        </Button>
      </Link>
    )
  }
}
