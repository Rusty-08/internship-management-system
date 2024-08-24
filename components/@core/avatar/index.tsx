'use client'

import Link from 'next/link'
import { ReactNode, useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import Image from 'next/image'
import AvatarPlaceholder from '@/public/general/images/male-avatar.svg'
import { Button } from '@/components/ui/button'
import { RiUser4Line } from "react-icons/ri"

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
            className={`border ${isOpen ? 'border-primary/30' : 'border-transparent'
              }`}
          >
            <Image
              src={AvatarPlaceholder}
              width={40}
              height={40}
              alt={`${user}`}
            />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-52" align="end">
        <DropdownMenuLabel>
          <div className="flex gap-2 items-center py-1">
            <Avatar>
              <AvatarImage src={image ? image : undefined} />
              <AvatarFallback>
                <Image
                  src={AvatarPlaceholder}
                  width={40}
                  height={40}
                  alt={`${user}`}
                />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h1 className="line-clamp-1">
                {user ?? 'Anonymous'}
              </h1>
              <p className="text-text font-normal">
                {role?.toLocaleLowerCase() ?? 'Unknown'}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="p-1">
          <DropdownMenuItem className="group p-0 hover:text-primary cursor-pointer">
            <Link onClick={() => setIsOpen(false)} href={profilePath}>
              <Button
                type="submit"
                variant="ghost"
                className="justify-start text-text px-3 gap-3 w-full"
              >
                <RiUser4Line
                  size="1.1rem"
                  className="group-hover:text-primary"
                />
                My Profile
              </Button>
            </Link>
          </DropdownMenuItem>
          {children}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
