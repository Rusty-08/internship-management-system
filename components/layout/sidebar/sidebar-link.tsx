'use client'

import { usePathname } from 'next/navigation'
import { SidebarLinkProps } from './links'
import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'

type SidebarProps = {
  isMinimized?: boolean
  sideLinks: SidebarLinkProps
  setOpen?: Dispatch<SetStateAction<boolean>>
}

const SidebarLinks = ({ isMinimized, sideLinks, setOpen }: SidebarProps) => {
  const path = usePathname()

  return (
    <div className="sidebar flex flex-col overflow-y-auto flex-grow gap-1 py-4">
      {sideLinks.map(item => (
        <Link
          key={item.path}
          href={item.path}
          className={`flex h-[2.8rem] relative justify-start items-center w-full rounded-none transition-all duration-75 hover:bg-primary/10 ${
            path === item.path ? 'text-white bg-primary/10' : 'text-white/50'
          } `}
          onClick={() => (setOpen ? setOpen(false) : null)}
        >
          {path === item.path && (
            <div className="absolute w-1 h-full bg-primary/80 rounded-full left-0 top-0"></div>
          )}
          <div className="flex justify-center flex-shrink-0 w-16">
            <item.icon
              className={`${
                path === item.path ? 'text-primary' : 'text-white/50'
              }`}
              size="1.4rem"
            />
          </div>
          <span
            className={`${
              isMinimized ? 'hidden' : 'visible'
            } group-hover:inline-flex whitespace-nowrap`}
          >
            {item.name}
          </span>
        </Link>
      ))}
    </div>
  )
}

export default SidebarLinks
