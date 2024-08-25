import { TaskSkeleton } from '@/components/@core/tasks/task-skeleton'
import TaskWrapper from '@/components/@core/tasks/task-wrapper'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Tasks Management',
}

const TasksManagement = async () => {
  return (
    <Suspense fallback={<TaskSkeleton />}>
      <TaskWrapper isMentor />
    </Suspense>
  )
}

export default TasksManagement
