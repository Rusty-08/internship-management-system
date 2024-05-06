import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export type TaskCardProps = {
  taskNumber: number
  title: string
  description: string
  status: 'completed' | 'in-progress' | 'pending'
  date: string
}

const TaskCard = ({
  taskNumber,
  title,
  description,
  status,
  date,
}: TaskCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">{date}</span>
          <Badge variant={status}>{status}</Badge>
        </div>
        <CardTitle className="text-xl mb-4">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button variant="outline">View Details</Button>
      </CardFooter>
    </Card>
  )
}

export default TaskCard
