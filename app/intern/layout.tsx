'use client'

import { ReactNode } from 'react'
import { internSidebarLinks } from '@/components/layout/sidebar/links'
import CoreLayout from '@/components/layout/wrapper'

const InternLayout = ({ children }: { children: ReactNode }) => {
  return (
    <CoreLayout sideLinks={internSidebarLinks} role="intern">
      {children}
    </CoreLayout>
  )
}

export default InternLayout
