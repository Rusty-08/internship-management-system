import AccountsTable from '@/components/@core/ui/table/account-table/accounts-table'
import { accountColumns } from './accounts-columns'
import { getInternUsers } from '../_actions/actions'
import { getBatchFilterItems } from '@/utils/batch'

export async function InternTable() {
  const userRole = 'INTERN'
  const data = await getInternUsers()
  const { batchesFilter, batches } = await getBatchFilterItems()

  const dataWithStatus = data?.map(intern => {
    return {
      ...intern,
      isActive: batches
        ? batches[batches.length - 1].id === intern.batchId
        : false,
    }
  })

  return (
    <AccountsTable
      data={dataWithStatus || []}
      batchesFilter={batchesFilter ? batchesFilter : undefined}
      user={userRole}
      accountColumns={accountColumns}
    />
  )
}
