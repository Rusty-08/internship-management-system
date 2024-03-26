'use client'
import React from 'react'
import { SidebarLinkType } from '@/components/admin/sidebar/links'
import { Button } from '@/components/ui/button'
import { CustomIcon } from '@/components/iconify'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

const Sidebar = ({ sideLinks }: { sideLinks: SidebarLinkType[] }) => {
  const path = usePathname()
  const router = useRouter()

  return (
    <div className="fixed left-0 top-0 h-screen bg-background w-80 p-2 border-r-[1px] border-secondary">
      <div className="flex flex-col gap-2 p-2 mt-32 w-modal-fullscreen ">
        {sideLinks.map(link => (
          <React.Fragment key={link.category}>
            <h1 className="text-primary/30 text-xs uppercase font-thin mt-5">
              {link.category}
            </h1>
            {link.links.map(item => (
              <Button
                className={`${
                  path === item.path && 'text-primary'
                } flex justify-start gap-5 w-full`}
                variant={'ghost'}
                onClick={() => router.push(item.path)}
              >
                <CustomIcon icon={item.icon} />
                {item.name}
              </Button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
