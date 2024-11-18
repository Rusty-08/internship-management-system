import { UserForm } from '@/components/@core/ui/table/account-table/account-form'
import { getAllBatchInServer } from '@/utils/batch'
import { getMentorUsers } from '@/utils/users'
import React from 'react'

const InternUser = async ({ params: { id } }: { params: { id: string } }) => {
  const [batches, mentors] = await Promise.all([
    getAllBatchInServer(),
    getMentorUsers(),
  ])

  const availableMentors = mentors?.filter(
    (mentor, index, self) =>
      index === self.findLastIndex(obj => obj.name === mentor.name),
  )

  return (
    <UserForm
      role="INTERN"
      userId={id}
      mentors={availableMentors}
      batches={batches}
    />
  )
}

export default InternUser
