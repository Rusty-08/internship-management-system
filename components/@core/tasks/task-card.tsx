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
import {
  MdDownloading,
  MdOutlinePending,
  MdTaskAlt,
  MdOutlineWarningAmber,
} from 'react-icons/md'
import DeleteConfirmation from './delete-confirmation'
import { TaskSubmission } from './task-submission'
import { TaskProps } from './types'
import { formatInTimeZone } from 'date-fns-tz'
import { IconLinkButton } from '@/components/ui/icon-link-button'
import { BsDot } from 'react-icons/bs'

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
    intern,
  } = task

  const formattedStartDate = formatInTimeZone(
    startDate,
    'Asia/Manila',
    'LLL dd',
  )
  const formattedEndDate = formatInTimeZone(
    endDate,
    'Asia/Manila',
    'LLL dd, yyyy',
  )

  const statusIcon = {
    COMPLETED: MdTaskAlt,
    PENDING: MdOutlinePending,
    IN_PROGRESS: MdDownloading,
    OVERDUE: MdOutlineWarningAmber,
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
      <AccordionTrigger className="py-4">
        <div
          className={`w-10 h-10 hidden md:flex flex-shrink-0 items-center justify-center rounded-full shadow-sm bg-${statusColor}/10`}
        >
          <Icon
            size="1.3rem"
            className={`text-${statusColor} ${
              status === 'OVERDUE' && 'mb-0.5'
            }`}
          />
        </div>
        <div className="flex flex-col flex-grow gap-1 lg:gap-4">
          {/* {isInAdmin && (
            <p className="flex-grow text-left text-sm font-semibold">
              {intern}
            </p>
          )} */}
          <div className="flex items-center gap-2">
            <Icon
              size="0.8rem"
              className={`flex md:hidden text-${statusColor} ${
                status === 'OVERDUE' && 'mb-0.5'
              }`}
            />
            <div className="flex flex-col gap-1">
              <p className="font-medium text-start text-[0.9rem]">{title}</p>
              <span
                className={cn(
                  'font-normal text-start tracking-wide text-muted-foreground',
                  isInAdmin ? 'text-[0.8rem]' : 'text-xs md:text-[0.8rem]',
                )}
              >
                {`${formattedStartDate} - ${formattedEndDate}`}
              </span>
            </div>
          </div>
        </div>
        <Badge variant={status} className="hidden lg:inline-flex">
          {statusName === 'In_progress' ? 'In Progress' : statusName}
        </Badge>
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col gap-4 relative">
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
            <span className="text-sm font-medium lg:w-[18.5rem]">
              {files && files.length > 1 ? 'Attachment' : 'Attachment'}
            </span>
            {files ? (
              <ul className="flex flex-col pl-4 text-muted-foreground list-disc gap-1">
                {files.map(file => (
                  <li key={file.url}>
                    <a
                      className="text-sm text-blue-500 truncate hover:underline"
                      href={file.url || ''}
                      target="_blank"
                    >
                      {file.name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground whitespace-pre-line">
                None
              </p>
            )}
          </div>
          <div className="flex gap-2 lg:gap-4 flex-col lg:flex-row">
            <span className="text-sm font-medium lg:w-[18.5rem] flex-shrink-0">
              Description
            </span>
            <p className="text-sm text-muted-foreground whitespace-pre-line text-justify">
              {description}
            </p>
          </div>
          <div className="flex relative gap-2 lg:gap-4 flex-col lg:items-center lg:flex-row">
            <span className="text-sm font-medium lg:w-[18.5rem] flex-shrink-0">
              Assigned Intern
            </span>
            <p className="text-sm text-muted-foreground text-start whitespace-pre-line">
              {intern}
            </p>
          </div>
          <div className="flex relative gap-2 border-t pt-4 lg:gap-4 flex-col lg:items-center lg:flex-row">
            <div className="flex items-center gap-1.5 lg:w-[18.5rem] flex-shrink-0">
              <Icon className={`text-${statusColor}`} />
              <span className="text-sm font-medium">
                {!isMentor && !isInAdmin ? 'Your Submission' : 'Submission'}
              </span>
            </div>
            {status !== 'COMPLETED' && (
              <p className="text-sm text-muted-foreground text-start whitespace-pre-line">
                {status === 'PENDING' ? 'Unavailable' : 'None'}
              </p>
            )}
          </div>
          {submissions?.length ? (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
                <span className="text-sm font-medium lg:w-[18.5rem]">
                  Date Submitted
                </span>
                <p className="text-sm text-muted-foreground">
                  {format(submissions[0].date, 'LLLL dd, y')}
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
          <div
            className={cn(
              !isMentor && 'relative',
              'lg:absolute right-0 -bottom-3',
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
                    <IconLinkButton
                      tooltip="Edit Task"
                      path={`/mentor/tasks-management/${task.id}`}
                      className="text-muted-foreground"
                    >
                      <BiEditAlt size="1.1rem" />
                    </IconLinkButton>
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
