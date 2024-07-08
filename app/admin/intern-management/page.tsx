import { BreadcrumbWrapper } from '@/components/@core/ui/breadcrumb'
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
    <div className="py-2 space-y-6">
      <BreadcrumbWrapper current="Intern Management" />
      <AccountsTable
        data={data}
        user={userRole}
        accountColumns={accountColumns}
      />
    </div>
  )
}

export default InternManagement
