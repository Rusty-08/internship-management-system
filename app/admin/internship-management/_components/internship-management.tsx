import InternshipTable from './batch-table'
import { getAllBatchInServer } from '@/utils/batch'

const InternshipManagementTable = async () => {
  const batches = await getAllBatchInServer()

  return <InternshipTable data={batches} />
}

export default InternshipManagementTable
