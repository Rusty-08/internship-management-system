import BatchForm from '../_components/batch-form'
import { getMentorUsers } from '@/utils/users'
import { Metadata } from 'next'
import { getAllBatchInServer } from '@/utils/batch'

export const metadata: Metadata = {
  title: 'Batch',
}

const CreateInternship = async ({
  params: { id },
}: {
  params: { id: string }
}) => {
  const mentors = await getMentorUsers()
  const batches = await getAllBatchInServer()

  const batchStatus = batches
    .find(batch => batch.status === 'ONGOING' || batch.status === 'PENDING')
    ?.status.toLowerCase()

  const availableMentors = mentors?.filter(
    (mentor, index, self) =>
      index === self.findIndex(obj => obj.name === mentor.name),
  )

  return (
    <div className="space-y-6 w-full">
      <BatchForm
        batchStatus={batchStatus}
        batchId={id}
        batchMentors={availableMentors}
      />
    </div>
  )
}

export default CreateInternship
