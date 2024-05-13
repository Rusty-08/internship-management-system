import { getMentorUsers } from '@/utils/users'
import { AccountsTable } from './_components/accounts-table'
import { BreadcrumbWrapper } from '@/components/@core/ui/breadcrumb'

export default async function MentorManagement() {
  const data = await getMentorUsers()

  return (
    <div className="py-2 space-y-6">
      <BreadcrumbWrapper links={[]} current="Mentor Management" />
      <AccountsTable data={data} />
    </div>
  )
}
