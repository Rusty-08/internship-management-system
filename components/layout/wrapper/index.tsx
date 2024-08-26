import { ReactNode } from 'react'

import { adminSidebarLinks, internSidebarLinks, mentorSidebarLinks, SidebarLinkProps } from '@/components/layout/sidebar/links'
import Sidebar from '@/components/layout/sidebar'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import { UserRole } from '@prisma/client'
import { cn } from '@/lib/utils'

type SidebarProps = {
  children: ReactNode
  role: UserRole
  withSidebar?: boolean
}

const CoreLayout = ({ children, role, withSidebar = true }: SidebarProps) => {
  const lisks = {
    ADMIN: adminSidebarLinks,
    MENTOR: mentorSidebarLinks,
    INTERN: internSidebarLinks,
  }

  return (
    <main className="min-h-screen flex relative w-full">
      {withSidebar && <Sidebar sideLinks={lisks[role]} />}
      <div className={cn(
        'flex flex-col transition-all duration-300 pl-0 ease-in-out w-full',
        withSidebar && 'lg:pl-16'
      )}
      >
        <Navbar profilePath={`/${role.toLowerCase()}/my-profile`} sideLinks={lisks[role]} />
        <div
          style={{ minHeight: 'calc(100vh - 9rem)' }}
          className="px-4 md:px-6 w-full"
        >
          {children}
        </div>
        <Footer />
      </div>
    </main>
  )
}

export default CoreLayout
