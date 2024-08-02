'use client'

import Link from 'next/link'
import { Fragment } from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { usePathname } from 'next/navigation'

export function BreadcrumbWrapper() {
  const path = usePathname()
  const segments = path.split('/').filter(Boolean)

  return (
    <div className='hidden h-10 overflow-hidden bg-card border px-5 rounded-md lg:flex items-center'>
      <Breadcrumb>
        <BreadcrumbList>
          {segments.map((segment, index) => {
            const href = '/' + segments.slice(0, index + 1).join('/')
            const isLast = index === segments.length - 1
            const name =
              segment.split('-')
                .map(item => item.charAt(0).toUpperCase() + item.slice(1, item.length))
                .join(' ')

            return (
              <Fragment key={href}>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="text-foreground font-medium">
                      {index === 0 ? 'Dashboard' : name}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={href}>{index === 0 ? 'Dashboard' : name}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}