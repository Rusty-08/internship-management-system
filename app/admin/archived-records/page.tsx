import { Metadata } from 'next'
import { Suspense } from 'react'
import { ArchivedUsers } from './_components/archive-users'
import { TableSkeleton } from '@/components/@core/skeletons/table-skeleton'

export const metadata: Metadata = {
  title: 'Archived Records',
}

const ArchivedRecords = async () => {
  return (
    <Suspense fallback={<TableSkeleton rows={8} cols={4} />}>
      <ArchivedUsers />
    </Suspense>
  )
}

export default ArchivedRecords
