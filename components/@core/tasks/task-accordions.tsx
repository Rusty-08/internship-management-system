'use client'

import { Accordion } from "@/components/ui/accordion"
import TaskCard from "./task-card"
import NoRecords from "../ui/no-records"
import { useMemo, useState, useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { SearchFilter } from "./search-filter"
import StatusFilter from "./status-filter"
import { TaskProps } from "./types"
import Link from "next/link"
import AddButton from '@/components/@core/ui/add-button';
import { Button } from "@/components/ui/button"
import { MdAdd } from "react-icons/md"

type TaskWrapperProps = {
  isMentor: boolean
  tasks: TaskProps[]
}

export const TaskAccordions = ({ tasks, isMentor }: TaskWrapperProps) => {
  const [taskSearch, setTaskSearch] = useState('')
  const [taskStatus, setTaskStatus] = useState('')
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = (task: string) => {
    const params = new URLSearchParams(searchParams)
    setTaskSearch(task)

    if (task) {
      params.set('task', task)
    } else {
      params.delete('task')
    }

    replace(`${pathname}?${params.toString()}`)
  }

  const handleStatusFilter = (status: string) => {
    const params = new URLSearchParams(searchParams)
    setTaskStatus(status)

    if (status && status !== 'all') {
      params.set('status', status);
    } else {
      params.delete('status');
    }

    replace(`${pathname}?${params.toString()}`)
  }

  const filteredTasks = useMemo(() => taskSearch
    ? tasks.filter(task =>
      task.title.toLowerCase().includes(taskSearch.toLowerCase())
    ) : tasks
    , [taskSearch, tasks])

  const selectedTasks = useMemo(() => taskStatus
    ? filteredTasks.filter(task =>
      taskStatus !== 'all' ? task.status.toLowerCase() === taskStatus : task
    ) : filteredTasks
    , [filteredTasks, taskStatus])

  useEffect(() => {
    const taskSearchParam = searchParams.get('task')
    const statusSearchParam = searchParams.get('status')

    if (taskSearchParam) setTaskSearch(taskSearchParam)
    if (statusSearchParam) setTaskSearch(statusSearchParam)
  }, [])

  return (
    <>
      <div className="w-full flex gap-3">
        <SearchFilter handleSearch={handleSearch} searchParams={searchParams} />
        <StatusFilter handleSearch={handleStatusFilter} searchParams={searchParams} />
        {isMentor && (
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
        )}
      </div>
      <div className="flex flex-col gap-4">
        {selectedTasks.length ? (
          <Accordion type="single" collapsible className="w-full">
            {selectedTasks.map(task => (
              <TaskCard key={task.id} task={task} isMentor={isMentor} />
            ))}
          </Accordion>
        ) : (
          <NoRecords
            searchOutput={taskSearch ?? ''}
            className="border bg-card rounded-md pb-8"
          />
        )}
      </div>
    </>
  )
}
