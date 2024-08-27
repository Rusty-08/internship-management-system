import AccountsTable from '@/components/@core/ui/table/account-table/accounts-table'
import { getArchivedUsers } from '@/utils/users'
import { archiveColumns } from './accounts-columns'

export const ArchivedUsers = async () => {
  const isArchivedPage = true
  const data = await getArchivedUsers()

  return (
    <AccountsTable
      data={data || []}
      isArchivedPage={isArchivedPage}
      accountColumns={archiveColumns}
    />
  )
}