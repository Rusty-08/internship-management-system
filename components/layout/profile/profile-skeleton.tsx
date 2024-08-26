import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function ProfileSkeleton() {
  return (
    <div className='w-full relative bg-card flex shadow-sm overflow-hidden flex-col rounded-md h-[23rem]'>
      <Skeleton className='h-60 w-full bg-muted rounded-none ' />
      <div className="px-12 absolute top-[12.5rem] flex items-center gap-2">
        <div className="bg-card rounded-full p-[0.4rem]">
           <Skeleton className='h-[8.6rem] w-[8.6rem] bg-muted rounded-full' />
        </div>
        <div className="flex flex-col mt-8 gap-2">
          <Skeleton className='h-8 w-[20rem] bg-muted' />
          <Skeleton className='h-5 w-[15rem] bg-muted' />
        </div>
      </div>
    </div>
  )
}

export default ProfileSkeleton