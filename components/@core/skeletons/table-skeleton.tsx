import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import React from 'react'

type TableSkeletonProps = {
  rows: number
  cols: number
  haveSearch?: boolean
  haveButton?: boolean
}

export function TableSkeleton({ haveSearch = false, haveButton = false, rows, cols }: TableSkeletonProps) {
  return (
    <div className="space-y-4">
      {haveSearch && <div className="flex justify-between">
        <Skeleton className='h-10 w-[25rem]' />
        {haveButton && <Skeleton className='h-10 w-40' />}
      </div>}
      <div className="border rounded-md bg-card overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              {Array.from({ length: cols }).map((_, colIndex) => (
                <th
                  key={colIndex}
                  className="px-6 py-2.5 text-xs text-foreground font-semibold uppercase tracking-wide text-nowrap"
                >
                  <Skeleton className="h-5 mx-auto w-16" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={rowIndex} className={cn('bg-transparent max-h-8', rowIndex % 2 !== 0 && 'bg-muted/50')}>
                {Array.from({ length: cols }).map((_, colIndex) => (
                  <td key={colIndex} className="px-6 py-3">
                    <Skeleton className="h-5 w-20 mx-auto bg-muted" />
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

export default TableSkeleton