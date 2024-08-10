import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export const TaskSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      {new Array(8).fill(null).map((_, idx) => (
        <Skeleton key={idx} className="h-16 w-full rounded-md" />
      ))}
    </div>
  )
}
