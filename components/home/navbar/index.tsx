import Link from 'next/link'
import Image from 'next/image'
import imsLogo from '@/public/home/ims-logo.svg'

import LoginButton from '@/components/auth/login/login-button'
import { ThemeToggle } from '@/components/providers/theme/theme-toggle'

const HomeNavbar = async () => {
  return (
    <div className="h-20 w-full flex items-center justify-between px-4 md:px-[8%]">
      <Link href="/" className="flex items-center gap-2">
        <Image width={40} height={40} alt="ims logo" src={imsLogo} />
        <h1 className="font-bold text-xl">LOGO</h1>
      </Link>
      <div className="flex items-center gap-x-4">
        <ThemeToggle />
        <LoginButton />
      </div>
    </div>
  )
}

export default HomeNavbar
