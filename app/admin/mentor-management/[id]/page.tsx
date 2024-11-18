import { UserForm } from '@/components/@core/ui/table/account-table/account-form'
import { getAllBatchInServer } from '@/utils/batch'
import { getInternUsers, getUserById } from '@/utils/users'
import React from 'react'

const MentorUser = async ({ params: { id } }: { params: { id: string } }) => {
  const WITHOUT_MENTORS = true
  const interns = await getInternUsers(WITHOUT_MENTORS)

  const assignedIntern = interns?.filter(intern => intern.mentorId === id)

  return (
    <UserForm
      role="MENTOR"
      userId={id}
      interns={assignedIntern ? assignedIntern : []}
    />
  )
}

export default MentorUser
