import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import React from 'react'

type AttendanceSkeletonProps = {
  rows: number
  cols: number
  isIntern?: boolean
}

export function AttendanceSkeleton({ isIntern = false, rows, cols }: AttendanceSkeletonProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Skeleton className='h-10 w-[20rem]' />
        <div className="space-x-3 flex">
          <Skeleton className='h-10 w-28' />
          {isIntern && <Skeleton className='h-10 w-32' />}
        </div>
      </div>
      <div className="border rounded-md bg-card overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              {Array.from({ length: cols }).map((_, colIndex) => (
                <th
                  key={colIndex}
                  className="px-6 py-2.5 text-xs text-foreground font-semibold uppercase tracking-wide text-nowrap"
                >
                  <Skeleton className="h-5 w-16" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={rowIndex} className={cn('bg-transparent max-h-8', rowIndex % 2 !== 0 && 'bg-muted/50')}>
                {Array.from({ length: cols }).map((_, colIndex) => (
                  <td key={colIndex} className="px-6 py-2">
                    <Skeleton className="h-5 w-20 bg-muted" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}