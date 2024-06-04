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
        <Button variant="outline">View details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-full lg:w-[30rem]">
        <DialogHeader>
          <DialogTitle>Task Details</DialogTitle>
        </DialogHeader>
        <div className="p-4 rounded-md bg-card border flex flex-col">
          <div className="flex pb-2 border-b">
            <span className="text-sm text-text font-medium w-1/3">Title</span>
            <p className="font-semibold text-sm">{task.title}</p>
          </div>
          <div className="flex py-2 border-b">
            <span className="text-sm text-text font-medium w-1/3 flex-shrink-0">
              Description
            </span>
            <p className="text-sm whitespace-pre-line">{task.description}</p>
          </div>
          <div className="flex py-2 border-b">
            <span className="text-sm text-text font-medium w-1/3">
              Start Date
            </span>
            <p className="text-sm">{format(task.startDate, 'LLLL dd, y')}</p>
          </div>
          <div className="flex py-2 border-b">
            <span className="text-sm text-text font-medium w-1/3">
              Due Date
            </span>
            <p className="text-sm">{format(task.endDate, 'LLLL dd, y')}</p>
          </div>
          <div className="flex pt-2">
            <span className="text-sm text-text font-medium w-1/3">
              Attachment/s
            </span>
            <div className="flex flex-col gap-1">
              {task.files?.map(({ id, name, url }) => (
                <a
                  key={id}
                  href={url || ''}
                  target="_blank"
                  className="text-blue-500 text-sm"
                >
                  {name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
