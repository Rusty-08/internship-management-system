'use client'

import { ReactNode } from 'react'
import { adminSidebarLinks } from '@/components/layout/sidebar/links'
import CoreLayout from '@/components/layout/wrapper'

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <CoreLayout sideLinks={adminSidebarLinks} role="admin">
      {children}
    </CoreLayout>
  )
}

export default AdminLayout
