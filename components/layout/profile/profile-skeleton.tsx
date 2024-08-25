import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function ProfileSkeleton() {
  return (
    <div className='w-full relative bg-card flex shadow-sm overflow-hidden flex-col rounded-md h-[23rem]'>
      <Skeleton className='h-60 w-full bg-muted rounded-none ' />
      <div className="px-8 absolute top-[12rem] flex items-center gap-2">
        <div className="bg-card rounded-full p-3">
           <Skeleton className='h-36 w-36 bg-muted rounded-full' />
        </div>
        <div className="flex flex-col mt-8 gap-2">
          <Skeleton className='h-8 w-[20rem] bg-muted' />
          <Skeleton className='h-6 w-[15rem] bg-muted' />
        </div>
      </div>
    </div>
  )
}

export default ProfileSkeleton