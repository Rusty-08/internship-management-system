import prisma from '@/lib/prisma'
import { Batch, Prisma, User } from '@prisma/client'

export const getBatchById = async (id: string) => {
  if (id === 'create-batch' || !id) return null

  const batch = await prisma.batch.findUnique({
    where: { id },
    include: {
      interns: true,
    },
  })

  return batch
}

// client call
export const getClientBatchById = async (
  id: string,
): Promise<(Batch & { interns: User[] }) | null> => {
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
  return await prisma.batch.findMany({
    include: {
      interns: true,
    },
  })
}

// server call
export const getBatchFilterItems = async (recordLabel?: string) => {
  const batches = await getAllBatchInServer()

  const batchesFilter = batches?.map(batch => {
    return {
      value: batch.id,
      name: batch.name,
      color:
        batch.status === 'ONGOING'
          ? 'bg-in-progress'
          : `bg-${batch.status.toLowerCase()}`,
    }
  })

  return {
    batchesFilter,
    batches,
  }
}
