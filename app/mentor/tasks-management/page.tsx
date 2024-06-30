import { SearchFilter } from '@/components/@core/tasks/search-filter'
import StatusFilter from '@/components/@core/tasks/status-filter'
import { TaskSkeleton } from '@/components/@core/tasks/task-skeleton'
import TaskWrapper from '@/components/@core/tasks/task-wrapper'
import AddButton from '@/components/@core/ui/add-button'
import { BreadcrumbWrapper } from '@/components/@core/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Suspense } from 'react'
import { IoAdd } from 'react-icons/io5'

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

  return (
    <div className="py-2 space-y-6">
      <BreadcrumbWrapper current="Tasks Management" />
      <div className="w-full flex gap-3">
        <SearchFilter />
        <StatusFilter />
        <Link
          href="/mentor/tasks-management/create-task"
          className="fixed lg:relative bottom-4 lg:bottom-0 right-4 lg:right-0"
        >
          <AddButton className="hidden lg:inline-flex">Create Task</AddButton>
          <Button size="circle" className="inline-flex md:hidden w-16 h-16">
            <IoAdd size="1.4rem" />
          </Button>
        </Link>
      </div>
      <Suspense key={task + status} fallback={<TaskSkeleton />}>
        <TaskWrapper isMentoshipRole={true} search={task} status={status} />
      </Suspense>
    </div>
  )
}

export default TasksManagement
