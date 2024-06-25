import TaskWrapper from '@/components/@core/tasks/task-wrapper'
import { BreadcrumbWrapper } from '@/components/@core/ui/breadcrumb'
import { Skeleton } from '@/components/ui/skeleton'
import { getTasks } from '@/utils/tasks'
import { getCurrentUserMentorId } from '@/utils/users'
import { Suspense } from 'react'
import { SearchFilter } from '@/components/@core/tasks/search-filter'
import StatusFilter from '@/components/@core/tasks/status-filter'
import { TaskSkeleton } from '@/components/@core/tasks/task-skeleton'

const TasksManagement = async () => {
  const mentorId = await getCurrentUserMentorId()
  const internTasks = await getTasks(mentorId || '')

  return (
    <div className="py-2 space-y-6">
      <BreadcrumbWrapper current="Tasks Management" />
      <div className="w-full flex gap-3">
        <SearchFilter />
        <StatusFilter />
      </div>
      <Suspense fallback={<TaskSkeleton />}>
        <TaskWrapper tasks={internTasks?.tasks || []} />
      </Suspense>
    </div>
  )
}

export default TasksManagement
