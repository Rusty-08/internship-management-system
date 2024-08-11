'use client'

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TooltipWrapper } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { MdDownloading, MdOutlinePending, MdTaskAlt, MdOutlineWarningAmber } from 'react-icons/md'
import DeleteConfirmation from './delete-confirmation'
import { TaskSubmission } from './task-submission'
import { TaskProps } from './types'
import { formatInTimeZone } from 'date-fns-tz'

export type TaskCardProps = {
  task: TaskProps
  isMentor: boolean
}

const TaskCard = ({ task, isMentor }: TaskCardProps) => {
  const [isOpenSubmission, setIsOpenSubmission] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const {
    id,
    title,
    description,
    status,
    startDate,
    endDate,
    submissions,
    files,
  } = task

  const formattedStartDate = formatInTimeZone(startDate, 'Asia/Manila', 'LLL dd')
  const formattedEndDate = formatInTimeZone(endDate, 'Asia/Manila', 'LLL dd, y')

  const statusIcon = {
    COMPLETED: MdTaskAlt,
    PENDING: MdOutlinePending,
    IN_PROGRESS: MdDownloading,
    OVERDUE: MdOutlineWarningAmber
  }

  const Icon = statusIcon[status]

  const statusColor = status.includes('_')
    ? status.split('_').join('-').toLowerCase()
    : status.toLowerCase()

  const statusName = status.charAt(0) + status.slice(1).toLowerCase()

  const deleteTask = async () => {
    setIsLoading(true)
    await fetch(`/api/tasks/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    setIsLoading(false)
    setIsOpenDelete(false)
    router.refresh()
  }

  return (
    <AccordionItem value={task.id}>
      <AccordionTrigger>
        <div className="self-start w-[1.3rem]">
          <Icon size="1.3rem" className={`text-${statusColor}`} />
        </div>
        <div className="flex flex-grow flex-col lg:flex-row gap-1 lg:justify-center lg:gap-4">
          <span className="text-sm font-normal text-start text-muted-foreground lg:w-[15rem]">{`${formattedStartDate} - ${formattedEndDate}`}</span>
          <p className="flex-grow text-left font-medium text-[0.95rem]">
            {title}
          </p>
        </div>
        <Badge variant={status} className="hidden lg:inline-flex">
          {statusName === 'In_progress' ? 'In Progress' : statusName}
        </Badge>
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col gap-4 relative">
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
            <span className="text-sm font-medium lg:w-[17.3rem]">
              Attachment
            </span>
            <div className="flex flex-col ps-4 gap-1">
              <ul className="list-disc">
                {files?.map(({ id, name, url }) => (
                  <li
                    key={id}
                    className="text-blue-500 text-sm hover:underline"
                  >
                    <a href={url || ''} target="_blank">
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex gap-2 lg:gap-4 flex-col lg:flex-row">
            <span className="text-sm font-medium lg:w-[17.3rem] flex-shrink-0">
              Description
            </span>
            <p className="text-sm text-muted-foreground whitespace-pre-line text-justify">
              {description}
            </p>
          </div>
          {status !== 'COMPLETED' && (
            <div
              className={cn(
                'flex relative gap-2 lg:gap-4 flex-col lg:items-center lg:flex-row',
                // !isMentor && 'mt-2',
              )}
            >
              <span className="text-sm font-medium lg:w-[17.3rem] flex-shrink-0">
                {!isMentor ? 'Your Submission' : 'Submission'}
              </span>
              <p className="text-sm text-muted-foreground text-start whitespace-pre-line">
                {status === 'PENDING' ? 'Unavailable' : 'None'}
              </p>
            </div>
          )}
          {submissions?.length ? (
            <div className="border-t pt-4 flex flex-col gap-4">
              <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
                <span className="text-sm font-medium lg:w-[17.3rem]">
                  Date Submitted
                </span>
                <p className="text-sm text-muted-foreground">
                  {format(
                    submissions[submissions.length - 1].date,
                    'LLLL dd, y',
                  )}
                </p>
              </div>
              <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
                <span className="text-sm font-medium lg:w-[17.3rem]">
                  Attachment
                </span>
                <div className="ps-4">
                  <ul className="list-disc flex flex-col gap-2">
                    {submissions?.map(({ id, name, url }) => (
                      <li
                        key={id}
                        className="text-blue-500 text-sm hover:underline"
                      >
                        <a href={url || ''} target="_blank">
                          {name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : null}
          <div className={cn(
            !isMentor && 'relative',
            "lg:absolute right-0 bottom-0",
          )}
          >
            {!isMentor ? (
              <TaskSubmission
                taskId={task.id}
                isOpen={isOpenSubmission}
                isPending={status === 'PENDING'}
                setIsOpenHandler={setIsOpenSubmission}
              />
            ) : (
              <>
                {status !== 'COMPLETED' && (
                  <>
                    <DeleteConfirmation
                      taskName={title}
                      deleteTask={deleteTask}
                      isOpen={isOpenDelete}
                      loading={isLoading}
                      setIsOpenHandler={setIsOpenDelete}
                    />
                    <TooltipWrapper tooltip="Edit Task">
                      <Link href={`/mentor/tasks-management/${task.id}`}>
                        <Button
                          variant="ghost"
                          size="circle"
                          className="text-muted-foreground"
                        >
                          <BiEditAlt size="1.1rem" />
                        </Button>
                      </Link>
                    </TooltipWrapper>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

export default TaskCard
