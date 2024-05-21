import React from 'react'
import AccountsTable from '../../../components/@core/ui/table/account-table/accounts-table'
import { getUsers } from '@/utils/users'
import { BreadcrumbWrapper } from '@/components/@core/ui/breadcrumb'
import { accountColumns } from './_components/accounts-columns'

const InternManagement = async () => {
  const data = await getUsers(false, 'INTERN')

  return (
    <div className="py-2 space-y-6">
      <BreadcrumbWrapper current="Intern Management" />
      <AccountsTable data={data} accountColumns={accountColumns} />
    </div>
  )
}

export default InternManagement
