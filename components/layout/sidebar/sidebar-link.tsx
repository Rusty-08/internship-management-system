'use client'

import { usePathname } from 'next/navigation'
import { ICONS, SidebarLinkProps } from './links'
import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'
import { cn } from '@/lib/utils'

type SidebarProps = {
  sideLinks: SidebarLinkProps
  setOpen?: Dispatch<SetStateAction<boolean>>
}

const SidebarLinks = ({ sideLinks, setOpen }: SidebarProps) => {
  const path = usePathname()

  return (
    <div className="sidebar flex flex-col overflow-y-auto flex-grow gap-1 py-4">
      {sideLinks.map(item => {
        const Icon = ICONS[item.icon]

        return (
          <Link
            key={item.path}
            href={item.path}
            className={cn(
              'group/link flex h-[2.8rem] relative justify-start items-center w-full rounded-none transition-all duration-300 ease-in-out',
              path === item.path ? 'text-white bg-primary/10' : 'text-text'
            )}
            onClick={() => (setOpen ? setOpen(false) : null)}
          >
            <div className="flex justify-center flex-shrink-0 w-16">
              <Icon
                size="1.4rem"
                className={cn(
                  'group-hover/link:text-primary transition-all duration-300 ease-in-out',
                  path === item.path ? 'text-primary' : 'text-text',
                )}
              />
            </div>
            <span className='group-hover/sidebar:inline-flex group-hover/link:text-white whitespace-nowrap transition-all duration-300 ease-in-out'>
              {item.name}
            </span>
          </Link>
        )
      })}
    </div>
  )
}

export default SidebarLinks
