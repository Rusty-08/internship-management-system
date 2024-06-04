import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { TaskProps } from './types'
import { format } from 'date-fns'

type TaskDetailProps = {
  task: TaskProps
  isOpen: boolean
  setIsOpenHandler: () => void
}

export function TaskDetails({
  task,
  isOpen,
  setIsOpenHandler,
}: TaskDetailProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpenHandler}>
      <DialogTrigger asChild>
        <Button variant="outline">View Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Task Details</DialogTitle>
        </DialogHeader>
        <div>
          <span className="font-medium">Title:</span> {task.title}
        </div>
        <div>
          <span className="font-medium">Description:</span>
          <p className="whitespace-pre-line text-justify">{task.description}</p>
        </div>
        <div>
          <span className="font-medium">Due Date: </span>
          {format(task.startDate, 'LLL dd')} -{' '}
          {format(task.endDate, 'LLL dd, y')}
        </div>
        {task.files?.map(({ id, name, url }) => (
          <div key={id}>
            <p className="font-medium">Guided Document:</p>
            <a href={url || ''} target="_blank" className="text-blue-500">
              {name}
            </a>
            <p className="italic text-sm">
              &#40;Click the link to download&#41;
            </p>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  )
}
