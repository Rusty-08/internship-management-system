import BatchForm from "../_components/batch-form"
import { getBatchById } from "@/utils/batch"

const CreateInternship = async ({ params: { id } }: { params: { id: string } }) => {
  const batch = await getBatchById(id)

  return (
    <div className="space-y-6">
      <BatchForm initialState={batch} />
    </div>
  )
}

export default CreateInternship