import { getArchivedUsers } from '@/utils/users'
import { Metadata } from 'next'
import AccountsTable from '../../../components/@core/ui/table/account-table/accounts-table'
import { archiveColumns } from './_components/accounts-columns'
import { Suspense } from 'react'
import { ArchivedUsers } from './_components/archive-users'
import TableSkeleton from '@/components/@core/skeletons/table-skeleton'

export const metadata: Metadata = {
  title: 'Archived Records',
}

const ArchivedRecords = async () => {
  return (
    <Suspense fallback={<TableSkeleton rows={8} cols={4} haveSearch haveButton />}>
      <ArchivedUsers />
    </Suspense>
  )
}

export default ArchivedRecords
