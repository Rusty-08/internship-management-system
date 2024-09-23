import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export const getBatchById = async (id: string) => {
  if (id === 'create-batch') return null

  const batch = await prisma.batch.findUnique({
    where: { id },
    include: {
      interns: true
    }
  })

  return batch
}

// client call
export const getAllBatch = async () => {
  const res = await fetch('/api/batch/get-all-batch', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const batches = res.json()

  return batches
}