import React from 'react'
import AccountsTable from './_components/accounts-table'
import { getInternUsers } from '@/utils/users'

const InternManagement = async () => {
  const data = await getInternUsers()

  return <AccountsTable data={data} />
}

export default InternManagement
