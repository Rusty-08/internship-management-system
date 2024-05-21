import { getUsers } from '@/utils/users'
import { BreadcrumbWrapper } from '@/components/@core/ui/breadcrumb'
import AccountsTable from '../../../components/@core/ui/table/account-table/accounts-table'
import { accountColumns } from './_components/accounts-column'

export default async function MentorManagement() {
  const data = await getUsers(false, 'MENTOR')

  return (
    <div className="py-2 space-y-6">
      <BreadcrumbWrapper current="Mentor Management" />
      <AccountsTable
        data={data}
        user="MENTOR"
        accountColumns={accountColumns}
      />
    </div>
  )
}
