import { Metadata } from 'next'
import { Suspense } from 'react'
import InternshipManagementTable from './_components/internship-management'
import { BatchTableSkeleton } from './_components/table-skeleton'

export const metadata: Metadata = {
  title: 'Internship Management',
}

const InternshipManagement = () => {
  return (
    <Suspense fallback={<BatchTableSkeleton />}>
      <InternshipManagementTable />
    </Suspense>
  )
}

export default InternshipManagement
