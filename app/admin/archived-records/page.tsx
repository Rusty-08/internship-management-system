import { ComingSoon } from '@/app/intern/chat/page'
import { getInternUsers } from '@/utils/users'
import AccountsTable from '../intern-management/_components/accounts-table'

const ArchivedRecords = async () => {
  const data = await getInternUsers(true)

  return <AccountsTable data={data} />
}

export default ArchivedRecords
