import LoginButton from '@/components/auth/login/login-button'
import { ProfileAvatar } from '@/components/home/navbar/profile'
import { ThemeToggle } from '@/components/providers/theme/theme-toggle'
import { getCurrentUser } from '@/utils/users'

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
            />
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
