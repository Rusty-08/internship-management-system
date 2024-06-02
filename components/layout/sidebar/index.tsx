'use client'

import { Dispatch, MouseEvent, SetStateAction } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import logo from '@/public/home/ims-logo.svg'
import { useSession } from 'next-auth/react'

import { MdOutlineKeyboardDoubleArrowLeft } from 'react-icons/md'
import { IconType } from 'react-icons/lib'

type SidebarLinkProps = {
  name: string
  path: string
  icon: IconType
}[]

type SidebarProps = {
  sideLinks: SidebarLinkProps
  isMinimized: boolean
  setIsMinimized: Dispatch<SetStateAction<boolean>>
}

const Sidebar = ({ sideLinks, isMinimized, setIsMinimized }: SidebarProps) => {
  const path = usePathname()
  const { data: session } = useSession()

  return (
    <div
      className={cn(
        'fixed flex flex-col left-0 bg-sidebar shadow top-0 h-screen z-50 pb-4 transition-all group duration-300 ease-in-out',
        isMinimized ? 'w-16 hover:w-[18rem]' : 'w-[18rem]',
      )}
    >
      <Button
        size="circle"
        className={cn(
          'absolute -right-[0.9rem] h-9 w-9 z-50 shadow-none top-[3.375rem] bg-sidebar text-text hover:text-white transform transition-all duration-300 ease-in-out hover:bg-slate-950',
          isMinimized ? 'rotate-180' : 'rotate-0',
        )}
        onClick={(e: MouseEvent) => {
          e.stopPropagation()
          setIsMinimized(!isMinimized)
        }}
        onMouseEnter={(e: MouseEvent) => e.stopPropagation()}
      >
        <MdOutlineKeyboardDoubleArrowLeft size="1.2rem" />
      </Button>
      <div className="flex items-center p-3 border-b h-[4.5rem] border-slate-800">
        <div className="flex items-center gap-2 overflow-hidden">
          <Image src={logo} alt="logo" width={40} height={40} />
          <div
            className={cn(
              'flex flex-col border-primary/50 group-hover:inline-flex',
              isMinimized ? 'hidden' : 'visible',
            )}
          >
            <h1 className="font-extrabold text-xl tracking-wider whitespace-nowrap bg-gradient-to-r from-primary to-fuchsia-900 bg-clip-text text-transparent">
              INTERNSHIP
            </h1>
            <h1 className="font-semibold tracking-wide text-text whitespace-nowrap">
              MANAGEMENT SYSTEM
            </h1>
          </div>
        </div>
      </div>
      <div className="sidebar flex flex-col overflow-y-auto flex-grow gap-1 py-6">
        {sideLinks.map(item => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex h-[2.8rem] relative justify-start items-center w-full rounded-none transition-all duration-75 hover:bg-primary/10 ${
              path === item.path ? 'text-white bg-primary/10' : 'text-white/50'
            } `}
          >
            {path === item.path && (
              <div className="absolute w-1 h-full bg-primary/80 rounded-full left-0 top-0"></div>
            )}
            <div className="flex justify-center flex-shrink-0 w-16">
              <item.icon
                className={`${
                  path === item.path ? 'text-primary' : 'text-white/50'
                }`}
                size="1.2rem"
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
