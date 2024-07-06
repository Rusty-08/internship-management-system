import { Button } from '@/components/ui/button'
import { siteConfig } from '@/configs/site'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'
import { CgMenuLeftAlt } from 'react-icons/cg'
import { SidebarLinkProps } from './links'
import SidebarLinks from './sidebar-link'

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
        'fixed hidden lg:flex flex-col left-0 bg-sidebar shadow top-0 h-screen z-50 pb-4 transition-all group/sidebar duration-300 ease-in-out',
        isMinimized ? 'w-16 hover:w-[18rem]' : 'w-[18rem]',
        !setIsMinimized && 'w-[20rem] flex lg:hidden',
      )}
    >
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
          )}
          {setIsMinimized ? (
            <div
              className={cn(
                'flex flex-col border-primary/50 group-hover/sidebar:inline-flex',
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
