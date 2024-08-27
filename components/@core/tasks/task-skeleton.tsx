import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

type TaskSkeletonProps = {
  isMentor?: boolean
}

export const TaskSkeleton = ({ isMentor = false }: TaskSkeletonProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3">
        <Skeleton className='h-10 flex-grow' />
        <Skeleton className='h-10 w-32' />
        {isMentor && <Skeleton className='h-10 w-36' />}
      </div>
      {new Array(8).fill(null).map((_, idx) => (
        <Skeleton key={idx} className="h-16 w-full rounded-md" />
      ))}
    </div>
  )
}
