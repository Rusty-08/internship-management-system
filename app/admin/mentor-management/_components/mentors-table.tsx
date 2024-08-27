import { getMentorUsers } from '@/utils/users'
import AccountsTable from '@/components/@core/ui/table/account-table/accounts-table'
import { accountColumns } from './accounts-column'

export async function MentorTable() {
  const userRole = 'MENTOR'
  const data = await getMentorUsers()

  return (
    <AccountsTable
      data={data || []}
      user={userRole}
      accountColumns={accountColumns}
    />
  )
}
