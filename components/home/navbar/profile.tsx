'use client'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { CustomIcon } from '@/components/iconify'
import { useState } from 'react'

type ProfileProps = {
  image?: string
  user?: string | null
  role?: string | null
}

export const Profile = ({ image, user, role }: ProfileProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="outline-none">
        <Avatar>
          <AvatarImage src={image} />
          <AvatarFallback
            className={`hover:text-primary border ${
              isOpen
                ? 'text-primary border-primary/30'
                : 'text-text border-transparent'
            }`}
          >
            <CustomIcon icon="lets-icons:user-alt-duotone" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-52" align="end">
        <DropdownMenuLabel>
          <div className="flex gap-2 items-center py-1">
            <Avatar>
              <AvatarImage src={image} />
              <AvatarFallback className="text-text">
                <CustomIcon icon="lets-icons:user-alt-duotone" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h1 className="line-clamp-1">{user ?? 'Anonymous'}</h1>
              <p className="text-text font-normal">
                {role?.toLocaleLowerCase()}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="p-1">
          <DropdownMenuItem
            className="py-2 group px-0 cursor-pointer"
            onClick={() => signOut()}
          >
            <span className="w-12 group-hover:text-primary flex justify-center">
              <CustomIcon icon="lets-icons:sign-out-squre-duotone-line" />
            </span>
            <Link className="group-hover:text-primary" href="/">
              Sign Out
            </Link>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
