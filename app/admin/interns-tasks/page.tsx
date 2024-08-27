import { TaskSkeleton } from '@/components/@core/tasks/task-skeleton'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { InternsTasksWrapper } from './_components/interns-tasks'

export const metadata: Metadata = {
  title: 'Interns Tasks',
}

const InternsTasks = async () => {
  return (
    <Suspense fallback={<TaskSkeleton />}>
      <InternsTasksWrapper />
    </Suspense>
  )
}

export default InternsTasks
