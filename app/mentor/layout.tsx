import { ReactNode } from 'react'

import Sidebar from '@/components/layout/sidebar'
import Navbar from '@/components/layout/navbar'
import { mentorSidebarLinks } from '@/components/mentor/sidebar/links'

const MentorLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="min-h-screen flex relative w-full">
      <Sidebar sideLinks={mentorSidebarLinks} />
      <Navbar profilePath="/mentor/profile" />
      <div
        style={{ minHeight: 'calc(100vh - 7rem)' }}
        className="ml-80 mt-24 p-4 flex-grow"
      >
        {children}
      </div>
    </section>
  )
}

export default MentorLayout
