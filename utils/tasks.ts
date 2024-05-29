import prisma from '@/lib/prisma'

export const getTasks = async (id: string) => {
  if (!id) return null
  return prisma.user.findUnique({
    where: { id },
    include: {
      tasks: {
        select: {
          id: true,
          title: true,
          description: true,
          status: true,
          startDate: true,
          endDate: true,
          files: {
            select: {
              id: true,
              name: true,
              url: true,
            },
          },
        },
      },
    },
  })
}
