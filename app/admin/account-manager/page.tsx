import prisma from '@/lib/prisma'
import { columns } from './accounts'
import { DataTable } from '@/components/ui/data-table'
import { getInternUsers } from '@/utils/users'

export default async function DemoPage() {
  const data = await getInternUsers()

  return (
    <section className="py-5">
      <DataTable columns={columns} data={data} />
    </section>
  )
}
