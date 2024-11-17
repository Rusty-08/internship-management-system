import { TableSkeleton } from '@/components/@core/skeletons/table-skeleton'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export function UserTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between gap-2">
        <Skeleton className="h-10 flex-grow" />
        <Skeleton className="h-10 w-44" />
        <Skeleton className="h-10 w-48" />
      </div>
      <TableSkeleton rows={8} cols={6} />
    </div>
  )
}
