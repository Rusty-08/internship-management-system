import { TaskSkeleton } from '@/components/@core/tasks/task-skeleton'
import TaskWrapper from '@/components/@core/tasks/task-wrapper'
import { getCurrentUser } from '@/utils/users'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'My Tasks',
}

const TasksManagement = async () => {
  const user = await getCurrentUser()

  return (
    <Suspense fallback={<TaskSkeleton />}>
      <TaskWrapper mentorId={user?.mentorId ?? undefined} />
    </Suspense>
  )
}

export default TasksManagement
