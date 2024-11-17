import { Metadata } from 'next'
import { Suspense } from 'react'
import { InternTable } from './_components/interns-table'
import { UserTableSkeleton } from '@/components/@core/ui/table/account-table/user-table-skeleton'

export const metadata: Metadata = {
  title: 'Intern Management',
}

const InternManagement = () => {
  return (
    <Suspense fallback={<UserTableSkeleton />}>
      <InternTable />
    </Suspense>
  )
}

export default InternManagement
