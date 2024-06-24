import TaskWrapper from '@/components/@core/tasks/task-wrapper'
import { BreadcrumbWrapper } from '@/components/@core/ui/breadcrumb'
import { getTasks } from '@/utils/tasks'
import { getCurrentUserMentorId } from '@/utils/users'
import { Suspense } from 'react'
import { SearchFilter } from '@/components/@core/tasks/search-filter'

const TasksManagement = async ({
  searchParams,
}: {
  searchParams?: { task?: string }
}) => {
  const mentorId = await getCurrentUserMentorId()
  const mentorTasks = await getTasks(mentorId || '')

  return (
    <div className="py-2 space-y-6">
      <BreadcrumbWrapper current="Tasks Management" />
      <Suspense fallback={<div>Loading...</div>}>
        <TaskWrapper tasks={mentorTasks?.tasks || []} isInternUser />
      </Suspense>
    </div>
  )
}

export default TasksManagement
