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
import { MdOutlineWavingHand } from "react-icons/md"

type SidebarSheetProps = {
  profilePath: string
  sideLinks: SidebarLinkProps
}

const Navbar = ({ profilePath, sideLinks }: SidebarSheetProps) => {
  const { data: session } = useSession()
  const user = session?.user

  return (
    <div className="flex bg-background items-end justify-center px-4 lg:px-6 h-[5rem] lg:h-[5.5rem]">
      <div className="bg-navbar shadow flex w-full items-center py-3 px-4 lg:px-6 lg:py-4 justify-between rounded-md">
      <p className="text-text text-sm hidden lg:inline-flex italic gap-1.5 font-medium">
          <MdOutlineWavingHand size='1.3rem' />
          Welcome back!
          <span className="text-foreground not-italic">
            {user?.name ? user?.name?.split(' ')[0] : 'Anonymous'}
          </span>
        </p>
        {/* TODO: Create a General Breadcrumb */}
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
                  <CiLogout
                    size="1.2rem"
                    className="group-hover:text-primary"
                  />
                  Sign Out
                </Button>
              </DropdownMenuItem>
            </form>
          </ProfileAvatar>
        </div>
      </div>
    </div>
  )
}

export default Navbar
