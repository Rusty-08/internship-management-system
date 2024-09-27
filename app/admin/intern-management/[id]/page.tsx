import { UserForm } from '@/components/@core/ui/table/account-table/account-form'
import { getAllBatchInServer } from '@/utils/batch'
import { getMentorUsers, getUserById } from '@/utils/users'
import React from 'react'

const InternUser = async ({ params: { id } }: { params: { id: string } }) => {
  const [batches, mentors] = await Promise.all([
    getAllBatchInServer(),
    getMentorUsers()
  ])

  // get the mentors that don't have assigned interns yet and also the assigned intern for the selected intern
  // const mentorsWithoutIntern = mentors?.filter(mentor => !mentor.assignedIntern || intern?.mentorId === mentor.id)

  return (
    <UserForm
      role='INTERN'
      userId={id}
      mentors={mentors}
      batches={batches}
    />
  )
}

export default InternUser