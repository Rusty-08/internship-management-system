import prisma from "@/lib/prisma"

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