import { getInternUsers } from '@/utils/users'
import AccountsTable from '../intern-management/_components/accounts-table'
import { BreadcrumbWrapper } from '@/components/@core/ui/breadcrumb'

const ArchivedRecords = async () => {
  const isArchivedPage = true
  const data = await getInternUsers(isArchivedPage)

  return (
    <div className="py-2 space-y-6">
      <BreadcrumbWrapper current="Archived Records" />
      <AccountsTable data={data} isArchivedPage={isArchivedPage} />
    </div>
  )
}

export default ArchivedRecords
