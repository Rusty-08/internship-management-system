'use client'

import { Button } from '@/components/ui/button'
import useMediaQuery from '@/hooks/useMediaQuery'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { RiArrowLeftLine } from 'react-icons/ri'

function MentorBackButton() {
  const pathname = usePathname()
  const isMobile = useMediaQuery('(max-width: 599px)')

  if (pathname === '/mentor/my-profile' || (pathname === '/mentor/tasks-management/create-task' && isMobile)) {
    return (
      <Link href='/mentor/tasks-management'>
        <Button variant='outline' size='circle'>
          <RiArrowLeftLine size='1.1rem' />
        </Button>
      </Link>
    )
  }
  return null
}

export default MentorBackButton