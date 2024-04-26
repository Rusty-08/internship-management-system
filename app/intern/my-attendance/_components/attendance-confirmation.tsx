import { LoadingSpinner } from '@/components/@core/spinner/circular'
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
import { FormEvent, useState } from 'react'

type AttendanceConfirmationProps = {
  addCurrentAttendance: (e: FormEvent) => void
  mode: string
  user: User | null
  loading: boolean
  isOpen: boolean
  setIsOpenHandler: () => void
}

export function AttendanceConfirmation({
  addCurrentAttendance,
  mode,
  user,
  loading,
  isOpen,
  setIsOpenHandler,
}: AttendanceConfirmationProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpenHandler}>
      <DialogTrigger asChild>
        <Button className="w-32">{mode}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode}</DialogTitle>
          <DialogDescription>
            Please verify your information. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={addCurrentAttendance}>
          <div className="grid gap-4 py-4">
            <div className="space-y-1">
              <span className="text-text text-sm">Name</span>
              <h6 className="text-foreground">{user?.name}</h6>
            </div>
            <div className="space-y-1">
              <span className="text-text text-sm">Email Address</span>
              <h6 className="text-foreground">{user?.email}</h6>
            </div>
            <div className="space-y-2">
              <span className="text-text">Time</span>
              <h6 className="text-foreground">
                {format(new Date(), 'h:mm aa')}
              </h6>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-40">
              {loading ? <LoadingSpinner /> : 'Save changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
