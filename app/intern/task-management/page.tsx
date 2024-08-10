import { TaskSkeleton } from '@/components/@core/tasks/task-skeleton'
import TaskWrapper from '@/components/@core/tasks/task-wrapper'
import { getCurrentUserMentorId } from '@/utils/users'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'My Tasks',
}

const TasksManagement = async () => {
  const mentorId = await getCurrentUserMentorId()

  return (
    <Suspense fallback={<TaskSkeleton />}>
      <TaskWrapper mentorId={mentorId} />
    </Suspense>
  )
}

export default TasksManagement
