'use client'

import { ReactNode } from 'react'
import { mentorSidebarLinks } from '@/components/layout/sidebar/links'
import CoreLayout from '@/components/layout/wrapper'

const MentorLayout = ({ children }: { children: ReactNode }) => {
  return (
    <CoreLayout sideLinks={mentorSidebarLinks} role="mentor">
      {children}
    </CoreLayout>
  )
}

export default MentorLayout
