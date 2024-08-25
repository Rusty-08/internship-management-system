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
  isInAdmin?: boolean
}

const TaskCard = ({ task, isMentor, isInAdmin }: TaskCardProps) => {
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
    intern
  } = task

  const formattedStartDate = formatInTimeZone(startDate, 'Asia/Manila', 'LLL dd')
  const formattedEndDate = formatInTimeZone(endDate, 'Asia/Manila', 'LLL dd')

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
      <AccordionTrigger className='py-4'>
        <div className={`w-10 h-10 flex items-center justify-center rounded-full shadow-sm bg-${statusColor}/10`}>
          <Icon size="1.3rem" className={`text-${statusColor} ${status === 'OVERDUE' && 'mb-0.5'}`} />
        </div>
        <div className="flex flex-grow flex-col lg:flex-row gap-1 lg:justify-center lg:items-center lg:gap-4">
          <div className="flex flex-col gap-1 lg:w-[15rem]">
            {isInAdmin && <p className="flex-grow text-left font-medium text-sm">{intern}</p>}
            <span className="font-normal text-start text-muted-foreground text-sm">
              {`${formattedStartDate} - ${formattedEndDate}`}
            </span>
          </div>
          <p className="flex-grow text-left font-medium text-[0.9rem]">
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
            <span className="text-sm font-medium lg:w-[18.5rem]">
              Attachment
            </span>
            {files ? (
              <a
                className="text-blue-500 text-sm hover:underline"
                href={files[0].url || ''}
                target="_blank"
              >
                {files[0].name}
              </a>
            ) : (
              <p className='text-sm text-muted-foreground whitespace-pre-line'>None</p>
            )
            }
          </div>
          <div className="flex gap-2 lg:gap-4 flex-col lg:flex-row">
            <span className="text-sm font-medium lg:w-[18.5rem] flex-shrink-0">
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
              <span className="text-sm font-medium lg:w-[18.5rem] flex-shrink-0">
                {!isMentor && !isInAdmin ? 'Your Submission' : 'Submission'}
              </span>
              <p className="text-sm text-muted-foreground text-start whitespace-pre-line">
                {status === 'PENDING' ? 'Unavailable' : 'None'}
              </p>
            </div>
          )}
          {submissions?.length ? (
            <div className="border-t pt-4 flex flex-col gap-4">
              <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
                <span className="text-sm font-medium lg:w-[18.5rem]">
                  Date Submitted
                </span>
                <p className="text-sm text-muted-foreground">
                  {format(
                    submissions[0].date,
                    'LLLL dd, y',
                  )}
                </p>
              </div>
              <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
                <span className="text-sm font-medium lg:w-[18.5rem]">
                  Attachment
                </span>
                <a
                  className="text-blue-500 text-sm hover:underline"
                  href={submissions[0].url || ''}
                  target="_blank"
                >
                  {submissions[0].name}
                </a>
              </div>
            </div>
          ) : null}
          <div className={cn(
            !isMentor && 'relative',
            "lg:absolute right-0 bottom-0",
          )}
          >
            {!isMentor && task.status !== 'COMPLETED' && !isInAdmin ? (
              <TaskSubmission
                taskId={task.id}
                isOpen={isOpenSubmission}
                isPending={status === 'PENDING'}
                setIsOpenHandler={setIsOpenSubmission}
              />
            ) : (
              <>
                {status !== 'COMPLETED' && !isInAdmin && (
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
