'use client'

import React from 'react'
import { CustomIcon } from '@/components/@core/iconify'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

type SidebarLinkProps = {
  name: string
  path: string
  icon: string
}[]

const Sidebar = ({ sideLinks }: { sideLinks: SidebarLinkProps }) => {
  const path = usePathname()

  return (
    <div
      style={{ background: 'hsl(222.2 47.4% 11.2%)' }}
      className="fixed flex flex-col left-0 top-0 h-screen w-[18rem] pb-4"
    >
      <div className="flex h-28 p-3 border-b border-secondary"></div>
      <div className="sidebar flex flex-col overflow-y-auto flex-grow gap-1 py-6">
        {sideLinks.map(item => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex py-2.5 justify-start items-center w-full rounded-none transition-all duration-75 hover:bg-primary/10 ${
              path === item.path
                ? 'text-white border-l-4 border-l-primary bg-primary/10'
                : 'text-white/50'
            } `}
          >
            <div className="flex justify-center w-16">
              <CustomIcon
                className={`${
                  path === item.path ? 'text-primary' : 'text-white/50'
                }`}
                icon={item.icon}
              />
            </div>
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
