import Link from 'next/link'

import LoginButton from '@/components/auth/login-button'

const Navbar = () => {
  return (
    <div className="h-20 w-screen flex items-center justify-between px-[10%]">
      <Link href="/">logo</Link>
      <LoginButton />
    </div>
  )
}

export default Navbar
