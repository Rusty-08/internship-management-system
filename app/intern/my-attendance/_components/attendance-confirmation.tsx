import { User } from '@prisma/client'
import { Dispatch, FormEvent, SetStateAction } from 'react'
import { AttendanceProps } from './attendance-columns'
import ConfirmationForm from './confirmation-form'
import useMediaQuery from '@/hooks/useMediaQuery'
import { DrawerConfirmation } from '@/components/@core/confirmation/drawer-confirmation'
import DialogConfirmation from '@/components/@core/confirmation/dialog-confirmation'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { MdAdd } from "react-icons/md"
import { dateInManilaTz } from '@/utils/format-date'

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
  const isAfternoon = new Date().getHours() >= 12
  const isMobile = useMediaQuery('(max-width: 599px)')

  const isWeekend = [0, 6].includes(new Date().getDay())

  const isTriggerDisabled = currentAttendance
    ? currentAttendance?.timeOutPM
      ? true
      : !isAfternoon && currentAttendance?.timeOutAM
        ? true
        : false
    : false || isWeekend

  // check if the current attendance is today
  const isAllowedToLogin = dateInManilaTz(currentAttendance?.date || null) === dateInManilaTz(new Date())

  const Submission = isMobile ? DrawerConfirmation : DialogConfirmation

  return (
    <Submission
      trigger={
        <>
          <MdAdd size="1.5rem" className='inline-flex md:hidden' />
          <IoMdAddCircleOutline size="1.3rem" className='hidden md:inline-flex' />
          <span className='mr-2'>{mode}</span>
        </>
      }
      title='Confirmation'
      description="Please verify the date and time."
      isPending={isAllowedToLogin ? isTriggerDisabled : false}
      isOpen={isOpen}
      setIsOpenHandler={setIsOpenHandler}
      isAddButton
      isSubmitting={loading}
    >
      <ConfirmationForm
        addCurrentAttendance={addCurrentAttendance}
        mode={mode}
        user={user}
        loading={loading}
        setIsOpenHandler={setIsOpenHandler}
      />
    </Submission>
  )
}
