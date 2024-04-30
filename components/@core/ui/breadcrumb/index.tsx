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

type BreadcrumbProps = {
  links: {
    title: string
    path: string
  }[]
  current: string
}

export function BreadcrumbWrapper({ links, current }: BreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {links.map(link => (
          <Fragment key={link.path}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={link.path}>{link.title}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </Fragment>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage>{current}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
