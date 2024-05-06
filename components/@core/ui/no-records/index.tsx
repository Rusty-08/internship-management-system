import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import { ClassNameValue } from 'tailwind-merge'

type NoRecordsProps = {
  searchOutput?: string
  className?: ClassNameValue
}

const NoRecords = ({ searchOutput, className, ...props }: NoRecordsProps) => {
  return (
    <div
      className={cn(
        'flex justify-center flex-col items-center pb-4',
        className,
      )}
      {...props}
    >
      <Image
        alt="no records"
        loading="eager"
        src={'/general/images/no-records.svg'}
        width="0"
        height="0"
        className="h-[15rem] w-auto object-cover"
      />
      <h1 className="text-lg text-text text-center w-2/3 font-medium">
        {searchOutput !== undefined
          ? 'No records found for'
          : 'No records found'}
        {searchOutput !== undefined && (
          <span className="text-secondary-foreground">
            {` "${searchOutput}"`}
          </span>
        )}
      </h1>
    </div>
  )
}

export default NoRecords
