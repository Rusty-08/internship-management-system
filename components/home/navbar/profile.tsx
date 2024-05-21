'use client'

import Link from 'next/link'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { RiUserSmileFill } from "react-icons/ri"

import { CustomIcon } from '@/components/@core/iconify'
import { ReactNode, useState } from 'react'

type ProfileProps = {
  image: string | null
  user?: string | null
  role?: string | null
  profilePath: string
  children?: ReactNode
}

export const ProfileAvatar = ({
  image,
  user,
  role,
  profilePath,
  children,
}: ProfileProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="outline-none">
        <Avatar>
          <AvatarImage src={image ? image : undefined} />
          <AvatarFallback
            className={`hover:text-primary border ${
              isOpen
                ? 'text-primary border-primary/30'
                : 'text-text border-transparent'
            }`}
          >
            <RiUserSmileFill size="1.3rem" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-52" align="end">
        <DropdownMenuLabel>
          <Link onClick={() => setIsOpen(false)} href={profilePath}>
            <div className="flex group gap-2 items-center cursor-pointer py-1">
              <Avatar>
                <AvatarImage src={image ? image : undefined} />
                <AvatarFallback className="text-text">
                  <CustomIcon icon="lets-icons:user-alt-duotone" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <h1 className="line-clamp-1 group-hover:text-primary">
                  {user ?? 'Anonymous'}
                </h1>
                <p className="text-text font-normal">
                  {role?.toLocaleLowerCase()}
                </p>
              </div>
            </div>
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="p-1">{children}</div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
