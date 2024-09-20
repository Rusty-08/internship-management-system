import prisma from "@/lib/prisma"
import InternshipTable from "./_components/batch-table"

const InternshipManagement = async () => {
  const batches = await prisma.batch.findMany()

  return (
    <InternshipTable data={batches} />
  )
}

export default InternshipManagement