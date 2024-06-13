'use client'

import { ThemeToggle } from '@/components/providers/theme/theme-toggle'
import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useSession } from 'next-auth/react'
import { CiLogout } from 'react-icons/ci'
import imagePlaceholder from '@/public/general/images/male-avatar.svg'
import { ProfileAvatar } from '@/components/@core/avatar'
import { logout } from '@/app/sign-in/_actions/authenticate'
import { SidebarSheet } from '../sidebar/sidebar-sheet'
import { SidebarLinkProps } from '../sidebar/links'

type SidebarSheetProps = {
  profilePath: string
  sideLinks: SidebarLinkProps
}

const Navbar = ({ profilePath, sideLinks }: SidebarSheetProps) => {
  const { data: session } = useSession()
  const user = session?.user

  return (
    <div className="flex items-center border-l bg-navbar border-slate-800 justify-between px-4 lg:px-10 h-[4.5rem]">
      <p className="text-text hidden lg:inline-flex font-medium">
        Internship Management System v0.0.1
      </p>
      <SidebarSheet sideLinks={sideLinks} />
      <div className="flex items-center gap-x-4">
        <ThemeToggle />
        <ProfileAvatar
          user={user?.name}
          role={user?.role}
          image={user?.image || imagePlaceholder}
          profilePath={profilePath}
        >
          <form action={logout}>
            <DropdownMenuItem className="group p-0 hover:text-primary cursor-pointer">
              <Button
                type="submit"
                variant="ghost"
                className="justify-start px-4 gap-4 w-full"
              >
                <CiLogout size="1.2rem" className="group-hover:text-primary" />
                Sign Out
              </Button>
            </DropdownMenuItem>
          </form>
        </ProfileAvatar>
      </div>
    </div>
  )
}

export default Navbar
