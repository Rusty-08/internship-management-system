'use client'

import { Dispatch, MouseEvent, SetStateAction } from 'react'
import { CustomIcon } from '@/components/@core/iconify'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type SidebarLinkProps = {
  name: string
  path: string
  icon: string
}[]

type SidebarProps = {
  sideLinks: SidebarLinkProps
  isMinimized: boolean
  setIsMinimized: Dispatch<SetStateAction<boolean>>
}

const Sidebar = ({ sideLinks, isMinimized, setIsMinimized }: SidebarProps) => {
  const path = usePathname()

  return (
    <div
      style={{ background: 'hsl(222.2 47.4% 11.2%)' }}
      className={cn(
        'fixed flex flex-col left-0 shadow top-0 h-screen z-50 pb-4 transition-all group duration-300 ease-in-out',
        isMinimized ? 'w-16 hover:w-[18rem]' : 'w-[18rem]',
      )}
    >
      <Button
        variant="secondary"
        size="circle"
        style={{
          top: 'calc(5rem - 1.25rem)',
          background: 'hsl(222.2 47.4% 11.2%)',
        }}
        className={cn(
          'absolute -right-3 text-text hover:text-white transform transition-all duration-300 ease-in-out',
          isMinimized ? 'rotate-180' : 'rotate-0',
        )}
        onClick={(e: MouseEvent) => {
          e.stopPropagation()
          setIsMinimized(!isMinimized)
        }}
        onMouseEnter={(e: MouseEvent) => e.stopPropagation()}
      >
        <CustomIcon icon="ph:arrow-line-left" />
      </Button>
      <div className="flex h-28 p-3 border-b border-slate-800"></div>
      <div className="sidebar flex flex-col overflow-y-auto flex-grow gap-1 py-6">
        {sideLinks.map(item => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex h-12 relative justify-start items-center w-full rounded-none transition-all duration-75 hover:bg-primary/10 ${
              path === item.path ? 'text-white' : 'text-white/50'
            } `}
          >
            {path === item.path && (
              <div className="absolute w-1 h-full bg-primary/80 rounded-full left-0 top-0"></div>
            )}
            <div className="flex justify-center flex-shrink-0 w-16">
              <CustomIcon
                className={`${
                  path === item.path ? 'text-primary' : 'text-white/50'
                }`}
                icon={item.icon}
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
    </div>
  )
}

export default Sidebar
