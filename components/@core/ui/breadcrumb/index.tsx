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

  // temp remove mentor dashboard: check if the user is mentor
  const paths = segments[0] === 'mentor' ? segments.slice(1) : segments

  return (
    <div className='hidden h-10 overflow-hidden bg-card border px-5 rounded-md lg:flex items-center'>
      <Breadcrumb>
        <BreadcrumbList>
          {paths.map((segment, index) => {
            const href = '/' + paths.slice(0, index + 1).join('/')
            const isLast = index === paths.length - 1
            const name =
              segment.split('-')
                .map(item => item.charAt(0).toUpperCase() + item.slice(1, item.length))
                .join(' ')

            return (
              <Fragment key={href}>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="text-foreground font-medium">
                      {index === 0 && segments[0] !== 'mentor' ? 'Dashboard' : name}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={href}>{index === 0 && segments[0] !== 'mentor' ? 'Dashboard' : name}</Link>
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