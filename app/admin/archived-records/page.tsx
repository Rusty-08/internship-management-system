import { getArchivedUsers } from '@/utils/users'
import { Metadata } from 'next'
import AccountsTable from '../../../components/@core/ui/table/account-table/accounts-table'
import { archiveColumns } from './_components/accounts-columns'

export const metadata: Metadata = {
  title: 'Archived Records',
}

const ArchivedRecords = async () => {
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

export default ArchivedRecords
