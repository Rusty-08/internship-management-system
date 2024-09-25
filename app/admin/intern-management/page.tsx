import { Metadata } from 'next'
import { Suspense } from 'react'
import { InternTable } from './_components/interns-table'
import TableSkeleton from '@/components/@core/skeletons/table-skeleton'

export const metadata: Metadata = {
  title: 'Intern Management',
}

const InternManagement = () => {
  return (
    <Suspense fallback={<TableSkeleton rows={8} cols={7} haveSearch haveButton />}>
      <InternTable />
    </Suspense>
  )
}

export default InternManagement
