'use client'

import { ReactNode, useState } from 'react'
import Sidebar from '@/components/layout/sidebar'
import Navbar from '@/components/layout/navbar'
import { adminSidebarLinks } from '@/components/admin/sidebar/links'
import { cn } from '@/lib/utils'

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const [isMinimized, setIsMinimized] = useState(true)

  return (
    <main className="min-h-screen flex relative w-full">
      <Sidebar
        sideLinks={adminSidebarLinks}
        isMinimized={isMinimized}
        setIsMinimized={setIsMinimized}
      />
      <div
        className={cn(
          'flex flex-col transition-all duration-300 ease-in-out w-full',
          isMinimized ? 'pl-[4rem]' : 'pl-[18rem]',
        )}
      >
        <Navbar profilePath="/admin/profile" />
        <div
          style={{ minHeight: 'calc(100vh - 5rem)' }}
          className="py-4 px-6 w-full"
        >
          {children}
        </div>
      </div>
    </main>
  )
}

export default AdminLayout
