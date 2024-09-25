import { Metadata } from 'next'
import TableSkeleton from '@/components/@core/skeletons/table-skeleton'
import { Suspense } from 'react'
import { MentorTable } from './_components/mentors-table'

export const metadata: Metadata = {
  title: 'Mentor Management',
}

export default function MentorManagement() {
  return (
    <Suspense fallback={<TableSkeleton rows={8} cols={5} haveSearch haveButton />}>
      <MentorTable />
    </Suspense>
  )
}
