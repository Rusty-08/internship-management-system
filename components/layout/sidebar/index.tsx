import { siteConfig } from '@/configs/site'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'
import { SidebarLinkProps } from './links'
import SidebarLinks from './sidebar-link'

type SidebarProps = {
  sideLinks: SidebarLinkProps
  setOpen?: Dispatch<SetStateAction<boolean>>
}

const Sidebar = ({
  sideLinks,
  setOpen,
}: SidebarProps) => {
  return (
    <div
      className={cn(
        'fixed lg:flex w-16 flex-col left-0 lg:hover:w-[18rem] bg-sidebar shadow top-0 h-screen z-50 pb-4 transition-all group/sidebar border-r border-transparent hover:border-slate-800 duration-300 ease-in-out',
        setOpen && 'w-[20rem]',
        !setOpen && 'hidden'
      )}
    >
      <div className="flex items-center p-2 h-20 px-3 border-b border-slate-800">
        <div className="flex items-center ps-0.5 gap-3 overflow-hidden">
          <Image
            src={siteConfig.logoPlaceholder}
            alt="logo"
            width={37}
            height={37}
            className="flex-shrink-0"
          />
          <div className='flex flex-col justify-center leading-6 whitespace-nowrap border-primary/50 group-hover/sidebar:inline-flex'>
            <h1 className="font-bold text-[1.2rem] tracking-wider text-sky-50">
              INTERNSHIP PORTAL
            </h1>
            <p className="font-medium text-[0.75rem] leading-3 tracking-[0.1rem] text-text">
              BAROQUE WORKS, LLC
            </p>
          </div>
        </div>
      </div>
      <SidebarLinks
        sideLinks={sideLinks}
        setOpen={setOpen}
      />
    </div>
  )
}

export default Sidebar
