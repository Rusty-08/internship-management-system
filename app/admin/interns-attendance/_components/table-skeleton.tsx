import { TableSkeleton } from '@/components/@core/skeletons/table-skeleton'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export function AttendanceTableSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-64" />
      <TableSkeleton rows={8} cols={6} />
    </div>
  )
}
