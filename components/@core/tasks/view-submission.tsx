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
  isIntern: boolean
}

export function ViewSubmission({
  task,
  isOpen,
  setIsOpenHandler,
  isIntern,
}: TaskDetailProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpenHandler}>
      <DialogTrigger asChild>
        <Button
          disabled={task.submissions?.length ? false : true}
          variant="secondary"
        >
          {isIntern ? 'Your' : 'View'} Submission
        </Button>
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
            {task.submissions?.length && (
              <p className="text-sm">
                {format(
                  task.submissions[task.submissions.length - 1].date,
                  'LLLL dd, y',
                )}
              </p>
            )}
          </div>
          <div className="flex pt-2">
            <span className="text-sm text-text font-medium w-1/3">
              Attachment/s
            </span>
            <div className="flex flex-col ps-4 gap-1">
              <ul className="list-disc">
                {task.submissions?.map(({ id, name, url }) => (
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
      </DialogContent>
    </Dialog>
  )
}
