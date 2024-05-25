import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AiOutlineLogin } from 'react-icons/ai'

type LoginButtonProps = {
  mode?: 'modal' | 'redirect'
  asChild?: boolean
}

const LoginButton = ({ mode = 'redirect', ...props }: LoginButtonProps) => {
  return (
    <Link href="/auth/login">
      <Button
        {...props}
        className="rounded-full gap-2 px-3 pe-5 py-3"
        variant="gradient"
      >
        <AiOutlineLogin size="1.4rem" />
        SIGN IN
      </Button>
    </Link>
  )
}

export default LoginButton
