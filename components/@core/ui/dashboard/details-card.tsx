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
import { ViewMore } from './view-more-btn'

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
              className="text-text hidden -translate-y-1 lg:flex font-medium hover:text-foreground items-center gap-2 text-[0.8rem]"
            >
              View all
              <PiArrowUpRightLight size='1rem' />
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
        <ViewMore navigate={navigate} />
      </CardContent>
    </Card>
  )
}
