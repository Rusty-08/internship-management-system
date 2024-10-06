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
import { User } from '@prisma/client'
import { cn } from '@/lib/utils'

type ProfileProps = {
  user?: User | null
  profilePath: string
  children?: ReactNode
}

export const ProfileAvatar = ({
  user,
  profilePath,
  children,
}: ProfileProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="outline-none">
        <Avatar className={cn(
          'border-2 border-transparent hover:border-primary/50',
          isOpen && 'border-primary/50'
        )}>
          <AvatarImage src={user?.image ? user.image : undefined} />
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
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage src={user?.image ? user.image : undefined} />
              <AvatarFallback>
                <Image
                  src={AvatarPlaceholder}
                  width={40}
                  height={40}
                  alt={`${user}`}
                />
              </AvatarFallback>
            </Avatar>
            <div className="flex relative flex-col truncate max-w-36">
              <p className="line-clamp-1 font-medium">
                {user?.name ?? 'Anonymous'}
              </p>
              <span className="text-text text-[0.8rem] font-normal">
                {user?.email ?? 'Unknown'}
              </span>
              <div className="absolute right-0 top-0 bg-gradient-to-l from-popover to-transparent w-6 h-full"></div>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="p-1">
          <DropdownMenuItem className="group p-0 hover:text-primary cursor-pointer">
            <Link
              onClick={() => setIsOpen(false)}
              href={profilePath}
              className='w-full'
            >
              <Button
                type="submit"
                variant="ghost"
                className="justify-start text-text px-3 gap-3 w-full"
              >
                <RiUser4Line
                  size="1rem"
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
