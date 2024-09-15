'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useState } from 'react'
import Sidebar from '@/components/layout/sidebar'
import { SidebarLinkProps } from './links'
import { RiMenu3Fill } from "react-icons/ri"

type SidebarSheetProps = {
  sideLinks: SidebarLinkProps
}

export function SidebarSheet({ sideLinks }: SidebarSheetProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <SheetTrigger asChild className="flex lg:hidden">
        <Button variant="ghost" size="circle">
          <RiMenu3Fill size="1.5rem" />
        </Button>
      </SheetTrigger>
      <SheetContent side='left'>
        <Sidebar sideLinks={sideLinks} setOpen={setIsOpen} />
      </SheetContent>
    </Sheet>
  )
}
