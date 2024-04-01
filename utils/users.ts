import { UserSubset } from '@/app/admin/mentor-management/accounts'
import prisma from '@/lib/prisma'

export async function getInternUsers(): Promise<UserSubset[]> {
  return await prisma.user.findMany({
    where: {
      role: 'INTERN',
    },
    select: {
      name: true,
      email: true,
    },
  })
}

export async function getMentorUsers(): Promise<UserSubset[]> {
  return await prisma.user.findMany({
    where: {
      role: 'MENTOR',
    },
    select: {
      name: true,
      email: true,
    },
  })
}
