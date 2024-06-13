'use client'

import { ReactNode, useState } from 'react'

import {
  SidebarLinkProps,
  mentorSidebarLinks,
} from '@/components/layout/sidebar/links'
import Sidebar from '@/components/layout/sidebar'
import Navbar from '@/components/layout/navbar'
import { cn } from '@/lib/utils'

type SidebarProps = {
  sideLinks: SidebarLinkProps
  children: ReactNode
  role: string
}

const CoreLayout = ({ sideLinks, children, role }: SidebarProps) => {
  const [isMinimized, setIsMinimized] = useState(false)

  return (
    <main className="min-h-screen flex relative w-full">
      <Sidebar
        sideLinks={sideLinks}
        isMinimized={isMinimized}
        setIsMinimized={setIsMinimized}
      />
      <div
        className={cn(
          'flex flex-col transition-all duration-300 pl-0 ease-in-out w-full',
          isMinimized ? 'lg:pl-[4rem]' : 'lg:pl-[18rem]',
        )}
      >
        <Navbar profilePath={`/${role}/profile`} sideLinks={sideLinks} />
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

export default CoreLayout
