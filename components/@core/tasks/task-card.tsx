import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { BiEditAlt } from 'react-icons/bi'
import { TooltipWrapper } from '@/components/ui/tooltip'
import { useState } from 'react'
import { TaskProps } from './types'
import { TaskSubmission } from './task-submission'
import Link from 'next/link'

import { MdDownloading } from 'react-icons/md'
import { MdTaskAlt } from 'react-icons/md'
import { MdOutlinePending } from 'react-icons/md'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { cn } from '@/lib/utils'

export type TaskCardProps = {
  task: TaskProps
  isIntern: boolean
}

const TaskCard = ({ task, isIntern }: TaskCardProps) => {
  const [isOpenSubmission, setIsOpenSubmission] = useState(false)

  const { title, description, status, startDate, endDate, submissions } = task

  const formattedStartDate = format(startDate, 'LLL dd')
  const formattedEndDate = format(endDate, 'LLL dd, y')

  const statusIcon = {
    COMPLETED: MdTaskAlt,
    PENDING: MdOutlinePending,
    IN_PROGRESS: MdDownloading,
  }

  const Icon = statusIcon[status]

  const statusColor = status.includes('_')
    ? status.split('_').join('-').toLowerCase()
    : status.toLowerCase()

  return (
    <AccordionItem value={task.id}>
      <AccordionTrigger>
        <div className="flex items-center w-[23%] gap-4">
          <Icon size="1.3rem" className={`text-${statusColor} opacity-50`} />
          <span className="text-sm font-normal text-muted-foreground">{`${formattedStartDate} - ${formattedEndDate}`}</span>
        </div>
        <p className="flex-grow text-left font-medium text-[0.95rem]">
          {title}
        </p>
        <Badge variant={status}>
          {status.charAt(0) + status.slice(1).toLowerCase()}
        </Badge>
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <span className="text-sm text-text font-medium w-[23%] flex-shrink-0">
                Description
              </span>
              <p className="text-sm whitespace-pre-line text-justify">
                {description}
              </p>
            </div>
            <div
              className={cn(
                'flex relative gap-4',
                status === 'COMPLETED' && '-mb-2',
              )}
            >
              <span className="text-sm text-text font-medium w-[23%] flex-shrink-0">
                {isIntern ? 'Your Submission' : 'Submission'}
              </span>
              {!submissions?.length && (
                <p className="text-sm text-start whitespace-pre-line">None</p>
              )}
              <div className="absolute right-0 bottom-0">
                {!isIntern && status !== 'COMPLETED' && (
                  <>
                    <TooltipWrapper tooltip="Delete Task">
                      <Button
                        variant="ghost"
                        size="circle"
                        className="text-text"
                      >
                        <MdOutlineDeleteOutline size="1.1rem" />
                      </Button>
                    </TooltipWrapper>
                    <TooltipWrapper tooltip="Edit Task">
                      <Link href={`/mentor/tasks-management/${task.id}`}>
                        <Button
                          variant="ghost"
                          size="circle"
                          className="text-text"
                        >
                          <BiEditAlt size="1.1rem" />
                        </Button>
                      </Link>
                    </TooltipWrapper>
                  </>
                )}
                {isIntern && status !== 'COMPLETED' && (
                  <TaskSubmission
                    taskId={task.id}
                    isOpen={isOpenSubmission}
                    isPending={status === 'PENDING'}
                    setIsOpenHandler={() =>
                      setIsOpenSubmission(!isOpenSubmission)
                    }
                  />
                )}
              </div>
            </div>
            {submissions?.length ? (
              <div className="border-t pt-4 flex flex-col gap-4">
                <div className="flex gap-4">
                  <span className="text-sm text-text font-medium w-[23%]">
                    Date Submitted
                  </span>
                  <p className="text-sm">
                    {format(
                      submissions[submissions.length - 1].date,
                      'LLLL dd, y',
                    )}
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="text-sm text-text font-medium w-[23%]">
                    Attachment
                  </span>
                  <div className="flex flex-col ps-4 gap-1">
                    <ul className="list-disc">
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
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

export default TaskCard
