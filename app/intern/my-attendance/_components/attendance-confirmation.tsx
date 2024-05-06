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
import { User } from '@prisma/client'
import { format } from 'date-fns'
import { FormEvent } from 'react'
import { AttendanceProps } from './attendance-columns'
import { LoadingSpinner } from '@/components/@core/loading'

type AttendanceConfirmationProps = {
  addCurrentAttendance: (e: FormEvent) => void
  mode: string
  user: User | null
  loading: boolean
  isOpen: boolean
  setIsOpenHandler: () => void
  currentAttendance: AttendanceProps | undefined
}

export function AttendanceConfirmation({
  addCurrentAttendance,
  mode,
  user,
  loading,
  isOpen,
  setIsOpenHandler,
  currentAttendance,
}: AttendanceConfirmationProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpenHandler}>
      <DialogTrigger asChild>
        <Button
          className="w-32"
          disabled={currentAttendance?.timeOutPM ? true : false}
        >
          {mode}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Attendance - {mode}</DialogTitle>
          <DialogDescription>
            Please verify the information. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={addCurrentAttendance}>
          <div className="grid gap-4 border grid-cols-2 rounded-md p-3 px-4">
            <div className="space-y-1">
              <span className="text-text text-sm">Name</span>
              <p className="text-foreground">{user?.name}</p>
            </div>
            <div className="space-y-1">
              <span className="text-text text-sm">Email Address</span>
              <p className="text-foreground">{user?.email}</p>
            </div>
            <div className="space-y-1">
              <span className="text-text text-sm">Date</span>
              <p className="text-foreground">
                {format(new Date(), 'LLL dd, y')}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-text text-sm">Time</span>
              <p className="text-foreground">{format(new Date(), 'h:mm aa')}</p>
            </div>
          </div>
          <DialogFooter className="pt-6">
            <Button disabled={loading} type="submit" className="w-full">
              {loading ? <LoadingSpinner /> : 'Save changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
