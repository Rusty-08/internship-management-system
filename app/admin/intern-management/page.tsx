import { getInternUsers } from '@/utils/users'
import { Metadata } from 'next'
import React from 'react'
import AccountsTable from '../../../components/@core/ui/table/account-table/accounts-table'
import { accountColumns } from './_components/accounts-columns'

export const metadata: Metadata = {
  title: 'Intern Management',
}

const InternManagement = async () => {
  const userRole = 'INTERN'
  const data = await getInternUsers()

  return (
    <AccountsTable
      data={data || []}
      user={userRole}
      accountColumns={accountColumns}
    />
  )
}

export default InternManagement
