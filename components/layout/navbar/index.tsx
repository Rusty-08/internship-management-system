import { ThemeToggle } from '@/components/providers/theme/theme-toggle'
import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { ProfileAvatar } from '@/components/@core/avatar'
import { logout } from '@/app/sign-in/_actions/authenticate'
import { SidebarSheet } from '../sidebar/sidebar-sheet'
import { SidebarLinkProps } from '../sidebar/links'
import { getCurrentUser, getServerUserByEmail } from '@/utils/users'
import { BreadcrumbWrapper } from '@/components/@core/ui/breadcrumb'
import { TbArrowRightFromArc } from "react-icons/tb"
import { RiArrowLeftLine } from "react-icons/ri"
import Link from 'next/link'
import MentorBackButton from './mentor-back-btn'
import Image from 'next/image'
import { siteConfig } from '@/configs/site'

type SidebarSheetProps = {
  profilePath: string
  sideLinks: SidebarLinkProps
}

const Navbar = async ({ profilePath, sideLinks }: SidebarSheetProps) => {
  const user = await getCurrentUser()
  const isMentor = user?.role === 'MENTOR'

  return (
    <div className="flex items-center justify-between px-4 lg:px-6 h-[5rem]">
      <div className="flex items-center lg:hidden gap-2">
        <Image
          src={siteConfig.logoPlaceholder}
          alt="logo"
          width={35}
          height={35}
        />
        <h1 className='font-bold text-[1.5rem] tracking-[0.1rem]'>IMS</h1>
      </div>
      <div className="hidden lg:flex items-center gap-3">
        {isMentor && (
          <MentorBackButton />
        )}
        <BreadcrumbWrapper />
      </div>
      <div className="flex items-center gap-x-3">
        <ThemeToggle />
        <ProfileAvatar
          user={user}
          profilePath={profilePath}
        >
          <form action={logout}>
            <DropdownMenuItem className="p-0 cursor-pointer">
              <Button
                type="submit"
                variant="ghost"
                className="justify-start text-text hover:text-destructive px-3 gap-3 w-full"
              >
                <TbArrowRightFromArc size="1rem" />
                Sign Out
              </Button>
            </DropdownMenuItem>
          </form>
        </ProfileAvatar>
        {!isMentor && <SidebarSheet sideLinks={sideLinks} />}
      </div>
    </div>
  )
}

export default Navbar
