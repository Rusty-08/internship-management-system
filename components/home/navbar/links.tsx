'use client'

import React from 'react'
import { links } from './link-lists'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const NavLinks = () => {
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-8">
      {links.map(link => (
        <Link
          key={link.name}
          href={link.path}
          className={cn(
            'text-foreground hover:text-primary font-medium transition-colors',
            pathname == link.path && 'text-primary',
          )}
        >
          {link.name}
        </Link>
      ))}
    </div>
  )
}

export default NavLinks
