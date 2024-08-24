import { ThemeToggle } from '@/components/providers/theme/theme-toggle'
import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { ProfileAvatar } from '@/components/@core/avatar'
import { logout } from '@/app/sign-in/_actions/authenticate'
import { SidebarSheet } from '../sidebar/sidebar-sheet'
import { SidebarLinkProps } from '../sidebar/links'
import { auth } from '@/auth'
import { getServerUserByEmail } from '@/utils/users'
import { BreadcrumbWrapper } from '@/components/@core/ui/breadcrumb'
import { TbArrowRightFromArc } from "react-icons/tb"

type SidebarSheetProps = {
  profilePath: string
  sideLinks: SidebarLinkProps
}

const Navbar = async ({ profilePath, sideLinks }: SidebarSheetProps) => {
  const session = await auth()
  const user = await getServerUserByEmail(session?.user.email || '')

  return (
    <div className="flex items-center justify-between px-4 lg:px-6 h-[5rem]">
      {/* <p className="text-text text-sm hidden lg:inline-flex italic gap-1.5 font-medium">
        <MdOutlineWavingHand size="1.3rem" />
        Welcome back!
        <span className="text-foreground not-italic">
          {user?.name ? user?.name?.split(' ')[0] : 'Anonymous'}
        </span>
      </p> */}
      <BreadcrumbWrapper />
      <SidebarSheet sideLinks={sideLinks} />
      <div className="flex items-center gap-x-4">
        <ThemeToggle />
        <ProfileAvatar
          user={user?.name}
          role={user?.role}
          image={user?.image || null}
          profilePath={profilePath}
        >
          <form action={logout}>
            <DropdownMenuItem className="group p-0 hover:text-primary cursor-pointer">
              <Button
                type="submit"
                variant="ghost"
                className="justify-start text-text px-3 gap-3 w-full"
              >
                <TbArrowRightFromArc
                  size="1.1rem"
                  className="group-hover:text-primary"
                />
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
