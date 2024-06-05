'use client'

import { ReactNode, useState } from 'react'

import { mentorSidebarLinks } from '@/components/layout/sidebar/links'
import Sidebar from '@/components/layout/sidebar'
import Navbar from '@/components/layout/navbar'
import { cn } from '@/lib/utils'

const MentorLayout = ({ children }: { children: ReactNode }) => {
  const [isMinimized, setIsMinimized] = useState(false)

  return (
    <main className="min-h-screen flex relative w-full">
      <Sidebar
        sideLinks={mentorSidebarLinks}
        isMinimized={isMinimized}
        setIsMinimized={setIsMinimized}
      />
      <div
        className={cn(
          'flex flex-col transition-all duration-300 ease-in-out w-full',
          isMinimized ? 'pl-[4rem]' : 'pl-[18rem]',
        )}
      >
        <Navbar profilePath="/mentor/profile" />
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

export default MentorLayout
