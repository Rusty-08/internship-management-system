import prisma from '@/lib/prisma'
import { Batch, User } from '@prisma/client'

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
export const getAllBatchInServer = async (): Promise<Batch[] | undefined> => {
  return await prisma.batch.findMany()
}

// server call
export const getBatchFilterItems = async () => {
  const batches = await getAllBatchInServer()

  const batchesFilter = batches?.map(batch => {
    return {
      value: batch.name,
      name: batch.name,
      color:
        batch.status === 'ONGOING'
          ? 'bg-in-progress'
          : `bg-${batch.status.toLowerCase()}`,
    }
  })

  batchesFilter?.unshift({
    value: 'all',
    name: 'All interns',
    color: 'all',
  })

  return {
    batchesFilter,
    batches,
  }
}
