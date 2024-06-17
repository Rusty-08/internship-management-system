import SubmitCancelButton from '@/components/@core/button/submit-cancel'
import { format } from 'date-fns'
import React from 'react'
import { AttendanceConfirmationProps } from './attendance-confirmation'

const ConfirmationForm = ({
  addCurrentAttendance,
  mode,
  user,
  loading,
  setIsOpenHandler,
}: AttendanceConfirmationProps) => {
  return (
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
          <p className="text-foreground">{format(new Date(), 'LLL dd, y')}</p>
        </div>
        <div className="space-y-1">
          <span className="text-text text-sm">Time</span>
          <p className="text-foreground">{format(new Date(), 'h:mm aa')}</p>
        </div>
      </div>
      <div className="pt-6">
        <SubmitCancelButton
          loading={loading}
          cancelOnclick={() => setIsOpenHandler(false)}
          className="w-full md:w-32"
        >
          {mode}
        </SubmitCancelButton>
      </div>
    </form>
  )
}

export default ConfirmationForm
