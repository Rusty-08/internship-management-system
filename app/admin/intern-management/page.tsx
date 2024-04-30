import React from 'react'
import AccountsTable from './_components/accounts-table'
import { getInternUsers } from '@/utils/users'

const InternManagement = async () => {
  const data = await getInternUsers(false)

  return <AccountsTable data={data} simpleTable={true} />
}

export default InternManagement
