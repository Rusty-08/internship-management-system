import { getInternUsers } from '@/utils/users'
import AccountsTable from '../intern-management/_components/accounts-table'

const ArchivedRecords = async () => {
  const isArchivedPage = true
  const data = await getInternUsers(isArchivedPage)

  return <AccountsTable data={data} isAchivedPage={isArchivedPage} />
}

export default ArchivedRecords
