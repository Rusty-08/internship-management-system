import { ReactNode } from 'react'

import Sidebar from '@/components/layout/sidebar'
import Navbar from '@/components/layout/navbar'
import { internSidebarLinks } from '@/components/intern/sidebar/links'

const InternLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="min-h-screen flex relative w-full">
      <Sidebar sideLinks={internSidebarLinks} />
      <Navbar profilePath="/intern/profile" />
      <div
        style={{ minHeight: 'calc(100vh - 7rem)' }}
        className="ml-[18rem] mt-24 p-4 flex-grow"
      >
        {children}
      </div>
    </main>
  )
}

export default InternLayout
