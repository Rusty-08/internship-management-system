import prisma from "@/lib/prisma"
import BatchForm from "../_components/batch-form"
import { getMentorUsers } from "@/utils/users"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Batch',
}

const CreateInternship = async ({ params: { id } }: { params: { id: string } }) => {
  const mentors = await getMentorUsers()
  const activeBatch = await prisma.batch.findFirst({
    where: { status: 'ONGOING' }
  })

  const availableMentors = mentors?.filter(mentor => !mentor.assignedIntern)

  return (
    <div className="space-y-6 w-full">
      <BatchForm
        haveOngoingBatch={!!activeBatch}
        batchId={id}
        batchMentors={id === 'create-batch' ? availableMentors : mentors}
      />
    </div>
  )
}

export default CreateInternship