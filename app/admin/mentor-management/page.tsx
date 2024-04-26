import { getMentorUsers } from '@/utils/users'
import { AccountsTable } from './_components/accounts-table'

export default async function AccountManager() {
  const data = await getMentorUsers()

  return (
    <section className="py-5">
      <AccountsTable data={data} />
    </section>
  )
}
