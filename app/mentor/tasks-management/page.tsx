import { TaskSkeleton } from '@/components/@core/tasks/task-skeleton'
import TaskWrapper from '@/components/@core/tasks/task-wrapper'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Tasks Management',
}

const TasksManagement = async () => {
  return (
    <div className="space-y-4">
      <Suspense fallback={<TaskSkeleton />}>
        <TaskWrapper isMentor />
      </Suspense>
    </div>
  )
}

export default TasksManagement
