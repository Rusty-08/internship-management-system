import { User } from '@prisma/client'
import { Dispatch, FormEvent, SetStateAction } from 'react'
import { AttendanceProps } from './attendance-columns'
import ConfirmationForm from './confirmation-form'
import { AttendanceDialog } from './confirmation-dialog'
import { AttendanceDrawer } from './confirmation-drawer'
import useMediaQuery from '@/hooks/useMediaQuery'

export type AttendanceConfirmationProps = {
  addCurrentAttendance: (e: FormEvent) => void
  mode: string
  user: User | null
  loading: boolean
  isOpen?: boolean
  setIsOpenHandler: Dispatch<SetStateAction<boolean>>
  currentAttendance?: AttendanceProps | undefined
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
  const isAfternoon = new Date().getHours() > 12
  const isMobile = useMediaQuery('(max-width: 599px)')

  const isTriggerDisabled = currentAttendance?.timeOutPM
    ? true
    : !isAfternoon && currentAttendance?.timeOutAM
    ? true
    : false
  
  const Confirmation = isMobile ? AttendanceDrawer : AttendanceDialog

  return (
    <Confirmation
      mode={mode}
      isTriggerDisabled={isTriggerDisabled}
      isOpen={isOpen}
      setIsOpenHandler={setIsOpenHandler}
    >
      <ConfirmationForm
        addCurrentAttendance={addCurrentAttendance}
        mode={mode}
        user={user}
        loading={loading}
        setIsOpenHandler={setIsOpenHandler}
      />
    </Confirmation>
  )
}
