import { ReactNode } from 'react'

import { adminSidebarLinks, internSidebarLinks, mentorSidebarLinks, SidebarLinkProps } from '@/components/layout/sidebar/links'
import Sidebar from '@/components/layout/sidebar'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import { UserRole } from '@prisma/client'

type SidebarProps = {
  children: ReactNode
  role: UserRole
}

const CoreLayout = ({ children, role }: SidebarProps) => {
  const lisks = {
    ADMIN: adminSidebarLinks,
    MENTOR: mentorSidebarLinks,
    INTERN: internSidebarLinks,
  }

  return (
    <main className="min-h-screen flex relative w-full">
      <Sidebar sideLinks={lisks[role]} />
      <div className='flex flex-col transition-all duration-300 pl-0 lg:pl-16 ease-in-out w-full'>
        <Navbar profilePath={`/${role.toLowerCase()}/profile`} sideLinks={lisks[role]} />
        <div
          style={{ minHeight: 'calc(100vh - 9.5rem)' }}
          className="py-4 px-4 md:px-6 w-full"
        >
          {children}
        </div>
        <Footer />
      </div>
    </main>
  )
}

export default CoreLayout
