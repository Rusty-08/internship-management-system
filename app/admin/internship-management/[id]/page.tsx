import prisma from "@/lib/prisma"
import BatchForm from "../_components/batch-form"
import { getMentorUsers } from "@/utils/users"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Batch',
}

const CreateInternship = async ({ params: { id } }: { params: { id: string } }) => {
  const mentors = await getMentorUsers()
  const batches = await prisma.batch.findMany()

  const batchStatus = batches.find(
    batch => batch.status === 'ONGOING' || batch.status === 'PENDING'
  )?.status.toLowerCase()

  const availableMentors = mentors?.filter(mentor => !mentor.assignedIntern)

  return (
    <div className="space-y-6 w-full">
      <BatchForm
        batchStatus={batchStatus}
        batchId={id}
        batchMentors={id === 'create-batch' ? availableMentors : mentors}
      />
    </div>
  )
}

export default CreateInternship