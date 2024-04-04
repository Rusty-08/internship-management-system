import { columns } from './accounts'
import { getMentorUsers } from '@/utils/users'
import { AccountsTable } from './_components/accounts-table'

export default async function AccountManager() {
  const data = await getMentorUsers()

  console.log(data)

  return (
    <section className="py-5">
      <AccountsTable columns={columns} data={data} />
    </section>
  )
}
