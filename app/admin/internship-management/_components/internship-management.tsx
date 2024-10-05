import prisma from "@/lib/prisma"
import InternshipTable from "./batch-table"

const InternshipManagementTable = async () => {
  const batches = await prisma.batch.findMany({
    include: { interns: true }
  })

  return (
    <InternshipTable data={batches} />
  )
}

export default InternshipManagementTable