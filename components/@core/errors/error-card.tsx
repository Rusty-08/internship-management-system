'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import React, { ReactNode } from 'react'
import { GoAlert } from 'react-icons/go'
import { ClassNameValue } from 'tailwind-merge'

type ErrorCardProps = {
  children: ReactNode
  className?: ClassNameValue
}

export const ErrorCard = ({ children, className }: ErrorCardProps) => {
  const { back } = useRouter()

  return (
    <Card className="w-full">
      <CardContent>
        <div className={cn("h-[20rem] gap-4 flex items-center flex-col justify-center", className)}>
          <div className="w-[4rem] h-[4rem] rounded-full flex items-center justify-center bg-destructive/20 border-2 border-destructive/40">
            <GoAlert size='2rem' className='mb-1 text-destructive' />
          </div>
          <p className='text-sm'>{children}</p>
          <Button className='mt-4' onClick={back}>Go back to previous page</Button>
        </div>
      </CardContent>
    </Card>
  )
}
