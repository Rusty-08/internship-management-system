import AccountsTable from '@/components/@core/ui/table/account-table/accounts-table'
import { accountColumns } from './accounts-columns'
import { getInternUsers } from '../_actions/actions'
import { getAllBatchInServer } from '@/utils/batch'

export async function InternTable() {
  const userRole = 'INTERN'
  const data = await getInternUsers()
  const batches = await getAllBatchInServer()

  const batchesFilter = batches?.map(batch => {
    return {
      value: batch.name,
      name: batch.name,
      color:
        batch.status === 'COMPLETED'
          ? 'bg-completed'
          : batch.status === 'ONGOING'
          ? 'bg-in-progress'
          : 'bg-pending',
    }
  })

  const dataWithStatus = data?.map(intern => {
    return {
      ...intern,
      isActive: batches
        ? batches[batches.length - 1].id === intern.batchId
        : false,
    }
  })

  batchesFilter?.unshift({
    value: 'all',
    name: 'All interns',
    color: 'all',
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
