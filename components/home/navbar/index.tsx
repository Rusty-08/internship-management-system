'use client'

import Link from 'next/link'

import LoginButton from '@/components/auth/login/login-button'
import { ThemeToggle } from '@/components/providers/theme/theme-toggle'
import NavLinks from './links'

import { useWindowScroll } from 'react-use'
import { useRef, useState, useEffect, ForwardedRef, RefAttributes } from 'react'
import { cn } from '@/lib/utils'
import { MenuSidebar } from './sheet'

const HomeNavbar = () => {
  const { y } = useWindowScroll()
  const navbarRef = useRef<any>(null)
  const [lastY, setLastY] = useState(y)
  const [hideOnScroll, setHideOnScroll] = useState(true)

  const navbarHeight = navbarRef.current?.offsetHeight
  const isScrolling = y > navbarHeight

  useEffect(() => {
    setLastY(y)
    if (y > navbarHeight) {
      if (y > lastY) return setHideOnScroll(false)
      if (y < lastY) return setHideOnScroll(true)
    } else {
      setHideOnScroll(true)
    }
  }, [lastY, navbarHeight, y])

  return (
    <div
      ref={navbarRef}
      className={cn(
        'flex items-center h-[5rem] md:h-24 top-0 left-0 w-full bg-background transition-all ease-in-out duration-300 z-50',
        isScrolling ? 'fixed' : 'absolute',
        hideOnScroll ? 'translate-y-0' : '-translate-y-full',
      )}
    >
      <div className="p-0 md:container w-full">
        <div className="flex items-center justify-between px-4 lg:px-[3%] w-full">
          <div className="flex items-center gap-4">
            <MenuSidebar />
            <Link href="/" className="flex items-center gap-2">
              {/* <Image width={40} height={40} alt="ims logo" src={imsLogo} /> */}
              <h1 className="font-bold text-3xl tracking-wide bg-gradient-to-r from-primary to-fuchsia-900 bg-clip-text text-transparent">
                IMS
              </h1>
            </Link>
          </div>
          <NavLinks />
          <div className="flex items-center gap-x-4">
            <ThemeToggle />
            <LoginButton />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeNavbar
