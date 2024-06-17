import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import AddButton from '@/components/@core/ui/add-button'
import { ReactNode, Dispatch, SetStateAction } from 'react'
import useMediaQuery from '@/hooks/useMediaQuery'

type AttendanceDrawerProps = {
  mode: string
  isTriggerDisabled: boolean
  isOpen?: boolean
  setIsOpenHandler: Dispatch<SetStateAction<boolean>>
  children: ReactNode
}

export const AttendanceDialog = ({
  mode,
  isTriggerDisabled,
  children,
  isOpen,
  setIsOpenHandler,
}: AttendanceDrawerProps) => {
  const isDesktop = useMediaQuery('(min-width: 600px)')

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpenHandler}>
        <DialogTrigger asChild>
          <AddButton disabled={isTriggerDisabled} className="w-full lg:w-auto">
            {mode}
          </AddButton>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Attendance - {mode}</DialogTitle>
            <DialogDescription>
              Please verify the information. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    )
  }
}
