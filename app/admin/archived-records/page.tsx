import { BreadcrumbWrapper } from '@/components/@core/ui/breadcrumb'
import { getUsers } from '@/utils/users'
import { Metadata } from 'next'
import AccountsTable from '../../../components/@core/ui/table/account-table/accounts-table'
import { archiveColumns } from './_components/accounts-columns'

export const metadata: Metadata = {
  title: 'Archived Records',
}

const ArchivedRecords = async () => {
  const isArchivedPage = true
  const data = await getUsers(isArchivedPage)

  return (
    <div className="py-2 space-y-6">
      <BreadcrumbWrapper current="Archived Records" />
      <AccountsTable
        data={data}
        isArchivedPage={isArchivedPage}
        accountColumns={archiveColumns}
      />
    </div>
  )
}

export default ArchivedRecords
