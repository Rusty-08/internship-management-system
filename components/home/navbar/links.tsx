'use client'

import React from 'react'
import { links } from './link-lists'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const NavLinks = () => {
  const pathname = usePathname()

  return (
    <div className="flex items-center">
      {links.map(link => (
        <Link
          key={link.name}
          href={link.path}
          className={cn(
            'text-text text-sm hover:text-primary py-1.5 px-6 rounded-full font-medium transition-colors',
            pathname == link.path && 'text-primary bg-primary/10',
          )}
        >
          {link.name}
        </Link>
      ))}
    </div>
  )
}

export default NavLinks
