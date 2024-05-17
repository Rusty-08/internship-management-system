import React from 'react'
import AccountsTable from './_components/accounts-table'
import { getInternUsers } from '@/utils/users'
import { BreadcrumbWrapper } from '@/components/@core/ui/breadcrumb'

const InternManagement = async () => {
  const data = await getInternUsers(false)

  return (
    <div className="py-2 space-y-6">
      <BreadcrumbWrapper current="Intern Management" />
      <AccountsTable data={data} />
    </div>
  )
}

export default InternManagement
