import AccountsTable from '@/components/@core/ui/table/account-table/accounts-table'
import { accountColumns } from './accounts-columns'
import { getInternUsers } from '../_actions/get-interns'

export const revalidate = 0

export async function InternTable() {
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
