'use client'

import { useState } from 'react'
import { SearchFilter } from './search-filter'
import TaskCard from './task-card'
import NoRecords from '@/components/@core/ui/no-records'
import { TaskStatus } from '@prisma/client'
import TaskForm from './task-form'

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
}

const TaskWrapper = ({ tasks }: TaskWrapperProps) => {
  const [searchTasks, setSearchTasks] = useState('')
  const [isOpen, setIsOpen] = useState(false)

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
        <TaskForm isOpen={isOpen} setIsOpen={setIsOpen} mode={'add'} />
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
              setIsOpen={setIsOpen}
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
