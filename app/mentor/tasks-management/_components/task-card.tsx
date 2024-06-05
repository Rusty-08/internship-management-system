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

export type TaskCardProps = {
  task: TaskProps
  isIntern: boolean
}

const TaskCard = ({ task, isIntern }: TaskCardProps) => {
  const [isOpenDetails, setIsOpenDetails] = useState(false)
  const [isOpenSubmission, setIsOpenSubmission] = useState(false)
  const [isOpenViewSubmission, setIsOpenViewSubmission] = useState(false)
  const { id, title, description, status, startDate, endDate } = task

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
            {isIntern && task.status !== 'COMPLETED' ? (
              <TaskSubmission
                key={id + 1}
                taskId={task.id}
                isOpen={isOpenSubmission}
                setIsOpenHandler={() => setIsOpenSubmission(!isOpenSubmission)}
              />
            ) : (
              <ViewSubmission
                task={task}
                isOpen={isOpenViewSubmission}
                setIsOpenHandler={() =>
                  setIsOpenViewSubmission(!isOpenViewSubmission)
                }
              />
            )}
            <TaskDetails
              key={id}
              task={task}
              isOpen={isOpenDetails}
              setIsOpenHandler={() => setIsOpenDetails(!isOpenDetails)}
            />
          </div>
          {!isIntern && (
            <TooltipWrapper tooltip="Edit Task">
              <Button variant="ghost" size="circle" className="text-text">
                <BiEditAlt size="1.4rem" />
              </Button>
            </TooltipWrapper>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

export default TaskCard
