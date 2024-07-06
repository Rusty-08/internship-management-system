import { SearchFilter } from '@/components/@core/tasks/search-filter'
import StatusFilter from '@/components/@core/tasks/status-filter'
import { TaskSkeleton } from '@/components/@core/tasks/task-skeleton'
import TaskWrapper from '@/components/@core/tasks/task-wrapper'
import AddButton from '@/components/@core/ui/add-button'
import { BreadcrumbWrapper } from '@/components/@core/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { MdAdd } from 'react-icons/md'

export const metadata: Metadata = {
  title: 'Tasks Management',
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
          <Button className="inline-flex z-50 font-normal h-12 pe-6 md:hidden gap-3">
            <MdAdd size="1.5rem" />
            New
          </Button>
        </Link>
      </div>
      <Suspense fallback={<TaskSkeleton />}>
        <TaskWrapper isMentoshipRole search={task} status={status} />
      </Suspense>
    </div>
  )
}

export default TasksManagement
