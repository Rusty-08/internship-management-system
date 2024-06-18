import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { ReactNode, Dispatch, SetStateAction } from 'react'
import { Button } from '@/components/ui/button'

type SubmissionDialogProps = {
  isPending: boolean
  isOpen?: boolean
  setIsOpenHandler: Dispatch<SetStateAction<boolean>>
  children: ReactNode
}

const SubmissionDialog = ({
  isPending,
  isOpen,
  setIsOpenHandler,
  children,
}: SubmissionDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpenHandler}>
      <DialogTrigger asChild>
        <Button disabled={isPending} className="w-full lg:w-max mt-2 lg:mt-0">
          Upload Report
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-full lg:w-[30rem]">
        <DialogHeader>
          <DialogTitle>Task Submission</DialogTitle>
        </DialogHeader>
        <DialogDescription>Submit your task report here</DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default SubmissionDialog
