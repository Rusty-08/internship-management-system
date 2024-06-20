import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Dispatch, SetStateAction } from 'react'
import { IoWarningOutline } from 'react-icons/io5'
import SubmitCancelButton from '@/components/@core/button/submit-cancel'
import { TooltipWrapper } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { MdOutlineDeleteOutline } from 'react-icons/md'

type ArchiveConfirmationProps = {
  taskName: string
  deleteTask: () => void
  loading: boolean
  isOpen: boolean
  setIsOpenHandler: Dispatch<SetStateAction<boolean>>
}

const DeleteConfirmation = ({
  taskName,
  deleteTask,
  isOpen,
  loading,
  setIsOpenHandler,
}: ArchiveConfirmationProps) => {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault()
    deleteTask()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpenHandler}>
      <DialogTrigger>
        <TooltipWrapper tooltip="Delete Task">
          <Button variant="ghost" size="circle" className="text-text">
            <MdOutlineDeleteOutline size="1.1rem" />
          </Button>
        </TooltipWrapper>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>
          <DialogDescription>
            You are about to delete the task entitled{' '}
            <span className="font-semibold">{taskName}</span>. Please confirm
            your action.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Alert variant="destructive">
              <IoWarningOutline size="1.3rem" className="text-red-500" />
              <AlertTitle>Reminder</AlertTitle>
              <AlertDescription>
                If you confirm this action, the task will no longer be able to
                be restored.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <SubmitCancelButton
              cancelOnclick={() => setIsOpenHandler(!isOpen)}
              loading={loading}
              className="w-40"
            >
              Save Changes
            </SubmitCancelButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteConfirmation
