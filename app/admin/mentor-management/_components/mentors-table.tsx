import { getMentorUsers } from '@/utils/users'
import AccountsTable from '@/components/@core/ui/table/account-table/accounts-table'
import { accountColumns } from './accounts-column'
import { getBatchFilterItems } from '@/utils/batch'

export async function MentorTable() {
  const userRole = 'MENTOR'
  const data = await getMentorUsers()
  const { batchesFilter, batches } = await getBatchFilterItems('mentors')

  const prevBatch = batches[batches.length - 1]

  const dataWithStatus = data?.map(mentor => {
    return {
      ...mentor,
      isActive: batches
        ? prevBatch.interns
            .map(intern => intern.name)
            .includes(`${mentor.assignedIntern}`) &&
          prevBatch.status !== 'COMPLETED'
        : false,
    }
  })

  return (
    <AccountsTable
      data={dataWithStatus || []}
      user={userRole}
      accountColumns={accountColumns}
      batchesFilter={batchesFilter}
    />
  )
}
