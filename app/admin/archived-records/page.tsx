import { getUsers } from '@/utils/users'
import AccountsTable from '../../../components/@core/ui/table/account-table/accounts-table'
import { BreadcrumbWrapper } from '@/components/@core/ui/breadcrumb'
import { archiveColumns } from './_components/accounts-columns'

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
