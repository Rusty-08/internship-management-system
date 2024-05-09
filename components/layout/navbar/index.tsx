import { signOut } from '@/auth'
import { CustomIcon } from '@/components/@core/iconify'
import LoginButton from '@/components/auth/login/login-button'
import { ProfileAvatar } from '@/components/home/navbar/profile'
import { ThemeToggle } from '@/components/providers/theme/theme-toggle'
import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { getCurrentUser } from '@/utils/users'
import { redirect } from 'next/navigation'

const Navbar = async ({ profilePath }: { profilePath: string }) => {
  const user = await getCurrentUser()

  return (
    <div
      style={{ width: 'calc(100% - 18rem)' }}
      className="fixed z-50 bg-background flex items-center justify-center p-4 h-28 top-0 left-[18rem]"
    >
      <div className="rounded-full flex items-center justify-between px-6 w-full h-full border">
        <p className="text-text font-thin">
          Welcome back!{' '}
          <span className="text-secondary-foreground font-semibold">
            {user?.name}
          </span>
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
              <form
                action={async () => {
                  'use server'
                  await signOut()
                  redirect('/')
                }}
              >
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
    </div>
  )
}

export default Navbar
