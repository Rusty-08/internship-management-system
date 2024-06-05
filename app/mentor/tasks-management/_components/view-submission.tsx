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

export function ViewSubmission({
  task,
  isOpen,
  setIsOpenHandler,
}: TaskDetailProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpenHandler}>
      <DialogTrigger asChild>
        <Button>View Submission</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-full lg:w-[30rem]">
        <DialogHeader>
          <DialogTitle>Submitted Report</DialogTitle>
        </DialogHeader>
        <div className="p-4 rounded-md bg-card border flex flex-col">
          <div className="flex py-2 border-b">
            <span className="text-sm text-text font-medium w-1/3">
              Date Submitted
            </span>
            <p className="text-sm">
              {task.submissions && task.submissions.length > 0
                ? format(
                    task.submissions[task.submissions.length - 1].date,
                    'LLLL dd, y',
                  )
                : 'No submissions yet'}
            </p>
          </div>
          <div className="flex pt-2">
            <span className="text-sm text-text font-medium w-1/3">
              Attachment/s
            </span>
            <div className="flex flex-col gap-1">
              {task.submissions?.map(({ id, name, url }) => (
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
