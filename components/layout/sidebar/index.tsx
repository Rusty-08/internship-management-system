import { Dispatch, MouseEvent, SetStateAction } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import logo from '@/public/home/ims-logo.svg'
import { FaRegLightbulb } from 'react-icons/fa6'

import { MdOutlineKeyboardDoubleArrowLeft } from 'react-icons/md'
import { CgMenuLeftAlt } from 'react-icons/cg'
import { SidebarLinkProps } from './links'
import SidebarLinks from './sidebar-link'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { siteConfig } from '@/configs/site'

type SidebarProps = {
  sideLinks: SidebarLinkProps
  isMinimized?: boolean
  setIsMinimized?: Dispatch<SetStateAction<boolean>>
  setOpen?: Dispatch<SetStateAction<boolean>>
}

const Sidebar = ({
  sideLinks,
  isMinimized,
  setIsMinimized,
  setOpen,
}: SidebarProps) => {
  return (
    <div
      className={cn(
        'fixed hidden lg:flex flex-col left-0 bg-sidebar shadow top-0 h-screen z-50 pb-4 transition-all group duration-300 ease-in-out',
        isMinimized ? 'w-16 hover:w-[18rem]' : 'w-[18rem]',
        !setIsMinimized && 'w-[20rem] flex lg:hidden',
      )}
    >
      {/* {setIsMinimized && (
        <Button
          size="circle"
          className={cn(
            'absolute -right-[0.7rem] h-9 w-9 z-50 shadow-none top-[3.375rem] bg-sidebar text-text hover:text-white transform transition-all duration-300 ease-in-out hover:bg-slate-950',
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
      )} */}
      <div className="flex items-center p-2 h-20 px-3 border-b border-slate-900">
        <div className="flex items-center gap-3 overflow-hidden">
          {setOpen ? (
            <Button
              variant="ghost"
              size="circle"
              onClick={() => setOpen(false)}
            >
              <CgMenuLeftAlt size="1.5rem" />
            </Button>
          ) : (
            <Image
              src={siteConfig.logoCircleWhite}
              alt="logo"
              width={39}
              height={39}
              className="flex-shrink-0"
            />
            // <Avatar>
            //   <AvatarFallback className="bg-primary/10 flex-shrink-0 border border-primary/20 text-primary">
            //     <FaRegLightbulb size="1.2rem" />
            //   </AvatarFallback>
            // </Avatar>
          )}
          {setIsMinimized ? (
            <div
              className={cn(
                'flex flex-col border-primary/50 group-hover:inline-flex',
                isMinimized ? 'hidden' : 'visible',
              )}
            >
              <h1 className="font-bold text-[1.1rem] tracking-wider text-sky-50">
                INTERNSHIP PORTAL
              </h1>
              <p className="font-medium text-sm tracking-wide text-text whitespace-nowrap">
                OnDemand Innovation, LLC
              </p>
            </div>
          ) : (
            <h1 className="font-bold text-3xl tracking-wide bg-gradient-to-r from-primary to-fuchsia-900 bg-clip-text text-transparent">
              IMS
            </h1>
          )}
        </div>
      </div>
      <SidebarLinks
        sideLinks={sideLinks}
        isMinimized={isMinimized}
        setOpen={setOpen}
      />
    </div>
  )
}

export default Sidebar
