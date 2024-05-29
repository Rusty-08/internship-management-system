'use client'

import { useState } from 'react'
import { SearchFilter } from './search-filter'
import TaskCard from './task-card'
import NoRecords from '@/components/@core/ui/no-records'
import { TaskStatus } from '@prisma/client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CustomIcon } from '@/components/@core/iconify'

type FileProps = {
  id: string
  name: string | null
  url: string | null
}

type TaskProps = {
  id: string
  title: string
  description: string
  status: TaskStatus
  startDate: Date
  endDate: Date
  files?: FileProps[]
}

type TaskWrapperProps = {
  tasks: TaskProps[]
  isInternUser?: boolean
}

const TaskWrapper = ({ tasks, isInternUser = false }: TaskWrapperProps) => {
  const [searchTasks, setSearchTasks] = useState('')

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTasks.toLowerCase()),
  )

  const sortedTasks = filteredTasks.sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <SearchFilter
          className="w-[20rem]"
          search={searchTasks}
          setSearch={setSearchTasks}
        />
        {!isInternUser && <Link href="/mentor/tasks-management/create-task">
          <Button>
            <span className="mr-2">Create Task</span>
            <CustomIcon icon="lucide:circle-plus" />
          </Button>
        </Link>}
      </div>
      {sortedTasks.length ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {sortedTasks.map(task => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              status={task.status}
              startDate={task.startDate}
              endDate={task.endDate}
            />
          ))}
        </div>
      ) : (
        <NoRecords
          searchOutput={searchTasks}
          className="border rounded-md pb-8"
        />
      )}
    </div>
  )
}

export default TaskWrapper
