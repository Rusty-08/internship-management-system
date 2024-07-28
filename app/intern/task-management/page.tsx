import { SearchFilter } from '@/components/@core/tasks/search-filter'
import StatusFilter from '@/components/@core/tasks/status-filter'
import { TaskSkeleton } from '@/components/@core/tasks/task-skeleton'
import TaskWrapper from '@/components/@core/tasks/task-wrapper'
import { getCurrentUserMentorId } from '@/utils/users'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'My Tasks',
}

const TasksManagement = async ({
  searchParams,
}: {
  searchParams?: {
    task?: string
    status?: string
  }
}) => {
  const task = searchParams?.task || ''
  const status = searchParams?.status || ''
  const mentorId = await getCurrentUserMentorId()

  return (
    <div className="space-y-6">
      <div className="w-full flex gap-3">
        <SearchFilter />
        <StatusFilter />
      </div>
      <Suspense fallback={<TaskSkeleton />}>
        <TaskWrapper mentorId={mentorId} search={task} status={status} />
      </Suspense>
    </div>
  )
}

export default TasksManagement
