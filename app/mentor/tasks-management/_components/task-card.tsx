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
import { format } from 'date-fns'
import { BiEditAlt } from 'react-icons/bi'
import { TooltipWrapper } from '@/components/ui/tooltip'

export type TaskCardProps = {
  title: string
  description: string
  status: TaskStatus
  startDate: Date
  endDate: Date
}

const TaskCard = ({
  title,
  description,
  status,
  startDate,
  endDate,
}: TaskCardProps) => {
  const formattedStartDate = format(startDate, 'LLL dd')
  const formattedEndDate = format(endDate, 'LLL dd, y')

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
          <TooltipWrapper tooltip="Edit Task">
            <Button variant="ghost" size="circle" className="text-text">
              <BiEditAlt size="1.4rem" />
            </Button>
          </TooltipWrapper>
        </div>
      </CardFooter>
    </Card>
  )
}

export default TaskCard
