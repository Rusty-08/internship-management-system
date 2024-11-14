import { getMentorUsers } from '@/utils/users'
import AccountsTable from '@/components/@core/ui/table/account-table/accounts-table'
import { accountColumns } from './accounts-column'
import { getBatchFilterItems } from '@/utils/batch'

export async function MentorTable() {
  const userRole = 'MENTOR'
  const data = await getMentorUsers()
  const { batchesFilter } = await getBatchFilterItems('mentors')

  return (
    <AccountsTable
      data={data || []}
      user={userRole}
      accountColumns={accountColumns}
      batchesFilter={batchesFilter}
    />
  )
}
