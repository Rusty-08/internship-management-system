import { UserForm } from '@/components/@core/ui/table/account-table/account-form'
import { getUserById } from '@/utils/users'
import React from 'react'

const InternUser = async ({ params: { id } }: { params: { id: string } }) => {
  const intern = await getUserById(id)

  return (
    <UserForm role='INTERN' initialValues={intern} />
  )
}

export default InternUser