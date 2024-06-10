import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { format } from 'date-fns'
import { BiEditAlt } from 'react-icons/bi'
import { TooltipWrapper } from '@/components/ui/tooltip'
import { TaskDetails } from './task-details'
import { useState } from 'react'
import { TaskProps } from './types'
import { TaskSubmission } from './task-submission'
import { ViewSubmission } from './view-submission'
import Link from 'next/link'

export type TaskCardProps = {
  task: TaskProps
  isIntern: boolean
}

const TaskCard = ({ task, isIntern }: TaskCardProps) => {
  const [dialog, setDialog] = useState({
    isOpenDetails: false,
    isOpenSubmission: false,
    isOpenViewSubmission: false,
  })

  const { title, description, status, startDate, endDate, submissions } = task

  const formattedStartDate = format(startDate, 'LLL dd')
  const formattedEndDate = format(endDate, 'LLL dd, y')

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">{`${formattedStartDate} - ${formattedEndDate}`}</span>
          <Badge variant={status}>
            {status.charAt(0) + status.slice(1).toLowerCase()}
          </Badge>
        </div>
        <CardTitle className="text-lg mb-4">{title}</CardTitle>
        <CardDescription className="line-clamp-1">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <div className="flex justify-between gap-2 w-full">
          <div className="space-x-2">
            {isIntern && status !== 'COMPLETED' && (
              <TaskSubmission
                taskId={task.id}
                isOpen={dialog.isOpenSubmission}
                setIsOpenHandler={() =>
                  setDialog({
                    ...dialog,
                    isOpenSubmission: !dialog.isOpenSubmission,
                  })
                }
              />
            )}
            {(isIntern && status === 'COMPLETED') || !isIntern ? (
              <ViewSubmission
                task={task}
                isIntern={isIntern}
                isOpen={dialog.isOpenViewSubmission}
                setIsOpenHandler={() =>
                  setDialog({
                    ...dialog,
                    isOpenViewSubmission: !dialog.isOpenViewSubmission,
                  })
                }
              />
            ) : null}
          </div>
          <div>
            <TaskDetails
              task={task}
              isOpen={dialog.isOpenDetails}
              setIsOpenHandler={() =>
                setDialog({ ...dialog, isOpenDetails: !dialog.isOpenDetails })
              }
            />
            {!isIntern && (
              <TooltipWrapper tooltip="Edit Task">
                <Link href={`/mentor/tasks-management/${task.id}`}>
                  <Button variant="ghost" size="circle" className="text-text">
                    <BiEditAlt size="1.1rem" />
                  </Button>
                </Link>
              </TooltipWrapper>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default TaskCard
