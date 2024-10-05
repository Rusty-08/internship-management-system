import { Metadata } from 'next'
import { Suspense } from 'react'
import TableSkeleton from '@/components/@core/skeletons/table-skeleton'
import InternshipManagementTable from './_components/internship-management'

export const metadata: Metadata = {
  title: 'Internship Management',
}

const InternshipManagement = () => {
  return (
    <Suspense fallback={<TableSkeleton rows={8} cols={6} haveSearch haveButton />}>
      <InternshipManagementTable />
    </Suspense>
  )
}

export default InternshipManagement