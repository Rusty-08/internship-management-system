import { UserForm } from '@/components/@core/ui/table/account-table/account-form'
import { getInternUsers, getUserById } from '@/utils/users'
import React from 'react'

const MentorUser = async ({ params: { id } }: { params: { id: string } }) => {
  const WITHOUT_MENTORS = true
  const interns = await getInternUsers(WITHOUT_MENTORS)

  const assignedIntern = interns?.find(intern => intern.mentorId === id)
  // const internsWithoutMentor = interns?.filter(intern => !intern.mentorId) || undefined

  return (
    <UserForm
      role='MENTOR'
      userId={id}
      interns={assignedIntern ? [assignedIntern] : []}
    // interns={
    //   internsWithoutMentor && assignedIntern
    //     ? [...internsWithoutMentor, assignedIntern] // display both remaining interns that don't have mentor yet
    //     : assignedIntern ? [assignedIntern] : internsWithoutMentor // display only the assign intern or the remaining interns if no intern assigned yet
    // }
    />
  )
}

export default MentorUser