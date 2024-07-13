import { cn } from '@/lib/utils'
import { TaskStatus } from '@prisma/client'
import { ClassNameValue } from 'tailwind-merge'

const GradientTop = ({ className, status }: { className?: ClassNameValue, status?: TaskStatus }) => {
  return (
    <div className={cn('flex translate-y-[1px] w-full justify-center', className)}>
      <div className="w-3/4">
        <div
          className={cn(
            'h-[1px] w-full bg-gradient-to-r from-transparent',
            status === 'COMPLETED' ? 'via-completed' : status === 'PENDING' ? 'via-pending' : 'via-in-progress', 
            'to-transparent',
          )}
        />
      </div>
    </div>
  )
}

export default GradientTop
