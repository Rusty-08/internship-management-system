import { columns } from './accounts'
import { getInternUsers } from '@/utils/users'
import { AccountsTable } from './_components/accounts-table'

export default async function AccountManager() {
  const data = await getInternUsers()

  return (
    <section className="py-5">
      <AccountsTable columns={columns} data={data} />
    </section>
  )
}
