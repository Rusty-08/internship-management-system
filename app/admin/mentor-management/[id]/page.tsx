import { UserForm } from '@/components/@core/ui/table/account-table/account-form'
import { getAllBatchInServer } from '@/utils/batch'
import { getInternUsers, getUserById } from '@/utils/users'
import React from 'react'

const MentorUser = async ({ params: { id } }: { params: { id: string } }) => {
  const WITHOUT_MENTORS = true
  const interns = await getInternUsers(WITHOUT_MENTORS)
  const allBatches = await getAllBatchInServer()

  const assignedIntern = interns?.find(
    intern =>
      intern.mentorId === id &&
      allBatches?.[allBatches?.length - 1].id === intern.batchId,
  )

  return (
    <UserForm
      role="MENTOR"
      userId={id}
      interns={assignedIntern ? [assignedIntern] : []}
    />
  )
}

export default MentorUser
