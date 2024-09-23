import { UserForm } from '@/components/@core/ui/table/account-table/account-form'
import { getUserById } from '@/utils/users'
import React from 'react'

const MentorUser = async ({ params: { id } }: { params: { id: string } }) => {
  const mentor = await getUserById(id)

  return (
    <UserForm role='MENTOR' initialValues={mentor} />
  )
}

export default MentorUser