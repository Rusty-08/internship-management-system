import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import { HiOutlineArrowRight } from 'react-icons/hi2'
import { ClassNameValue } from 'tailwind-merge'

type StatCardProps = {
  header: string
  image: string | StaticImport
  children: ReactNode
  className?: ClassNameValue
}

export const StatCard = ({ header, image, className, children }: StatCardProps) => {
  return (
    <Card className={cn('relative overflow-hidden', className)}>
      <CardHeader>
        <p className="text-text font-semibold text-xs uppercase">{header}</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-end space-x-2">
          {children}
        </div>
        <Image
          src={image}
          alt="total days"
          width={150}
          height={150}
          className="absolute w-12 h-12 top-2 right-3 md:h-[9rem] md:w-auto dark:invert md:-top-3 md:right-0"
        />
      </CardContent>
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
