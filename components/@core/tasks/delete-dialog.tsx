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
import { TooltipWrapper } from '@/components/ui/tooltip'

import { ReactNode, Dispatch, SetStateAction } from 'react'
import { MdOutlineDeleteOutline } from 'react-icons/md'

type DeleteDialogProps = {
  taskName: string
  isOpen?: boolean
  setIsOpenHandler: Dispatch<SetStateAction<boolean>>
  children: ReactNode
}

const DeleteDialog = ({
  taskName,
  isOpen,
  setIsOpenHandler,
  children,
}: DeleteDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpenHandler}>
      <DialogTrigger>
        <TooltipWrapper tooltip="Delete Task">
          <Button variant="ghost" size="circle" className="text-muted-foreground">
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
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default DeleteDialog
