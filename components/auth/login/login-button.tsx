import { CustomIcon } from '@/components/@core/iconify'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type LoginButtonProps = {
  mode?: 'modal' | 'redirect'
  asChild?: boolean
}

const LoginButton = ({ mode = 'redirect', ...props }: LoginButtonProps) => {
  return (
    <Link href="/auth/login">
      <Button
        {...props}
        className="rounded-full gap-2 px-3 py-3"
        variant="gradient"
      >
        <CustomIcon icon="uiw:login" />
        SIGN IN
      </Button>
    </Link>
  )
}
export default LoginButton
