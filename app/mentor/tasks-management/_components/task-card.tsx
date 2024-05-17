import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { TaskStatus } from '@prisma/client'
import { format, parseISO } from 'date-fns'
import { CustomIcon } from '@/components/@core/iconify'
import { Dispatch, SetStateAction } from 'react'
import TaskForm from './task-form'

export type TaskCardProps = {
  title: string
  description: string
  status: TaskStatus
  startDate: string
  endDate: string
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const TaskCard = ({
  title,
  description,
  status,
  startDate,
  endDate,
  setIsOpen,
}: TaskCardProps) => {
  const formattedStartDate = format(parseISO(startDate), 'LLL dd, y')
  const formattedEndDate = format(parseISO(endDate), 'LLL dd, y')
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">{`${formattedStartDate} - ${formattedEndDate}`}</span>
          <Badge variant={status}>{status}</Badge>
        </div>
        <CardTitle className="text-xl mb-4">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <div className="flex justify-between gap-2 w-full">
          <Button variant="outline">View Details</Button>

          <Button
            variant="ghost"
            size="circle"
            className="text-text"
            onClick={() => setIsOpen(true)}
          >
            <CustomIcon icon="iconamoon:edit-duotone" className="w-5 h-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default TaskCard
