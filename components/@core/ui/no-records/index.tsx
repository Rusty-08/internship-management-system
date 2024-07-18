import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import { ClassNameValue } from 'tailwind-merge'
import NoRecordsImage from '@/public/general/images/no-records.svg'

type NoRecordsProps = {
  searchOutput?: string
  noRecordMessage?: string
  className?: ClassNameValue
}

const NoRecords = ({ searchOutput, noRecordMessage, className, ...props }: NoRecordsProps) => {
  return (
    <div
      className={cn(
        'flex h-full my-auto justify-center flex-col items-center pb-4',
        className,
      )}
      {...props}
    >
      <Image
        alt="no records"
        loading="eager"
        src={NoRecordsImage}
        width="0"
        height="0"
        className="h-[12rem] w-auto object-cover"
      />
      {/* <h1 className="text-lg text-text text-center w-2/3 font-medium">
        {searchOutput && searchOutput?.length > 0
          ? 'No records found for'
          : 'No records found'}
        {searchOutput && searchOutput?.length > 0 ? (
          <span className="text-secondary-foreground">
            {` "${searchOutput}"`}
          </span>
        ): null}
      </h1> */}
      <h1 className="text-text text-sm text-center w-2/3 font-medium">
        {noRecordMessage || 'No records found'}
      </h1>
    </div>
  )
}

export default NoRecords
