import { Metadata } from 'next'
import { Suspense } from 'react'
import { MentorTable } from './_components/mentors-table'
import { UserTableSkeleton } from '@/components/@core/ui/table/account-table/user-table-skeleton'

export const metadata: Metadata = {
  title: 'Mentor Management',
}

export default function MentorManagement() {
  return (
    <Suspense fallback={<UserTableSkeleton />}>
      <MentorTable />
    </Suspense>
  )
}
