import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { ReactNode } from 'react'
import { ClassNameValue } from 'tailwind-merge'
import noRecordsImage from '@/public/general/images/no-records.svg'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PiArrowUpRightLight } from 'react-icons/pi'
import NoRecordFound from '../no-records'

type DetailsCardProps = {
  header: string
  description: string
  noRecords: boolean
  navigate: string
  noRecordMessage?: string
  children: ReactNode
  className?: ClassNameValue
}

export const DetailsCard = ({
  header,
  description,
  noRecords,
  navigate,
  noRecordMessage,
  className,
  children,
}: DetailsCardProps) => {
  return (
    <Card className={cn('flex flex-col relative overflow-hidden', className)}>
      <CardHeader>
        <CardTitle className="text-xl">
          <div className="flex justify-between">
            {header}
            <Link
              href={navigate}
              className="text-text hidden lg:flex font-normal hover:text-primary items-center gap-2 text-sm"
            >
              View all
              <PiArrowUpRightLight />
            </Link>
          </div>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4 w-full">
        {noRecords ? (
          <NoRecordFound noRecordMessage={noRecordMessage} />
        ) : (
          children
        )}
        <Link href={navigate}>
          <Button className='flex gap-2 md:hidden w-full'>
            View More
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
