import prisma from "@/lib/prisma"
import { Batch, User } from "@prisma/client"
import { revalidatePath } from "next/cache"

export const getBatchById = async (id: string) => {
  if (id === 'create-batch' || !id) return null

  const batch = await prisma.batch.findUnique({
    where: { id },
    include: {
      interns: true
    }
  })

  return batch
}

// client call
export const getClientBatchById = async (
  id: string
): Promise<Batch & { interns: User[] } | null> => {
  if (id === 'create-batch' || !id) return null

  const res = await fetch(`/api/batch/get/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (res.ok) {
    const data = await res.json()
    return data
  } else {
    return null
  }
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

// server call
export const getAllBatchInServer = async () => {
  return await prisma.batch.findMany()
}