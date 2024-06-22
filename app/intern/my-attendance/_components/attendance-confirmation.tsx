import { User } from '@prisma/client'
import { Dispatch, FormEvent, SetStateAction } from 'react'
import { AttendanceProps } from './attendance-columns'
import ConfirmationForm from './confirmation-form'
import useMediaQuery from '@/hooks/useMediaQuery'
import { DrawerConfirmation } from '@/components/@core/confirmation/drawer-confirmation'
import DialogConfirmation from '@/components/@core/confirmation/dialog-confirmation'
import { IoMdAddCircleOutline } from 'react-icons/io'

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

  const Submission = isMobile ? DrawerConfirmation : DialogConfirmation

  return (
    <Submission
      trigger={
        <>
          {mode}
          <IoMdAddCircleOutline size="1.3rem" />
        </>
      }
      title={`Attendance - ${mode}`}
      description="Please verify the information. Click save when you're done."
      isPending={isTriggerDisabled}
      isOpen={isOpen}
      setIsOpenHandler={setIsOpenHandler}
      className='lg:w-36'
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
