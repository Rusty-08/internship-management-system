'use client'

import { logout } from '@/app/auth/_actions/authenticate'
import { CustomIcon } from '@/components/@core/iconify'
import LoginButton from '@/components/auth/login/login-button'
import { ProfileAvatar } from '@/components/home/navbar/profile'
import { ThemeToggle } from '@/components/providers/theme/theme-toggle'
import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useSession } from 'next-auth/react'

const Navbar = ({ profilePath }: { profilePath: string }) => {
  // const user = await getCurrentUser()
  const { data: session } = useSession()
  const user = session?.user

  return (
    <div
      style={{ background: 'hsl(222.2 47.4% 11.2%)' }}
      className="flex items-center border-l shadow border-muted justify-between px-10 h-20"
    >
      <p className="text-text text-sm font-medium">
        Internship Management System v0.0.1
      </p>
      <div className="flex items-center gap-x-4">
        <ThemeToggle />
        {user ? (
          <ProfileAvatar
            user={user.name}
            role={user.role}
            image={user.image}
            profilePath={profilePath}
          >
            <form action={logout}>
              <DropdownMenuItem className="group p-0 hover:text-primary cursor-pointer">
                <Button
                  type="submit"
                  variant="ghost"
                  className="justify-start px-0 w-full"
                >
                  <span className="w-12 group-hover:text-primary flex justify-center">
                    <CustomIcon icon="lets-icons:sign-out-squre-duotone-line" />
                  </span>
                  Sign Out
                </Button>
              </DropdownMenuItem>
            </form>
          </ProfileAvatar>
        ) : (
          <LoginButton />
        )}
      </div>
    </div>
  )
}

export default Navbar
