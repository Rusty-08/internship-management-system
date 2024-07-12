import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ReactNode } from 'react'
import { HiOutlineArrowRight } from 'react-icons/hi2'
import { ClassNameValue } from 'tailwind-merge'

type StatCardProps = {
  header: string
  children: ReactNode
  className?: ClassNameValue
}

export const StatCard = ({ header, className, children }: StatCardProps) => {
  return (
    <Card className={cn('relative overflow-hidden', className)}>
      <CardHeader>
        <p className="text-text font-medium text-xs uppercase">{header}</p>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {/* <CardFooter>
        <Link
          href={footerHref}
          className="text-text text-sm hover:text-foreground flex gap-2 items-center"
        >
          {footer}
          <HiOutlineArrowRight />
        </Link>
      </CardFooter> */}
    </Card>
  )
}
