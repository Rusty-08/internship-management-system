'use client'
import React from 'react'
import { SidebarLinkType } from '@/components/admin/sidebar/links'
import { Button } from '@/components/ui/button'
import { CustomIcon } from '@/components/@core/iconify'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const Sidebar = ({ sideLinks }: { sideLinks: SidebarLinkType[] }) => {
  const path = usePathname()

  return (
    <div
      style={{ background: 'hsl(222.2 84% 4.9%)' }}
      className="fixed flex left-0 top-0 h-screen w-80 p-1 pb-4 border-r border-secondary"
    >
      <div className="sidebar flex-col overflow-y-auto flex-grow gap-2 ps-4 py-2 pe-2.5 mt-32 w-modal-fullscreen">
        {sideLinks.map(link => (
          <React.Fragment key={link.category}>
            {link.category && (
              <h1 className="text-white/30 text-sm mb-3 uppercase font-medium mt-5">
                {link.category}
              </h1>
            )}
            <div className="flex flex-col gap-1 border-l border-primary/20">
              {link.links.map(item => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex py-2.5 justify-start items-center ps-4 gap-5 w-full rounded-none transition-all duration-75 hover:bg-primary/10 ${
                    path === item.path
                      ? 'text-white border-l-2 border-primary bg-primary/10'
                      : 'text-white/50'
                  } `}
                >
                  <CustomIcon
                    className={`${
                      path === item.path ? 'text-primary' : 'text-white/50'
                    }`}
                    icon={item.icon}
                  />
                  {item.name}
                </Link>
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
