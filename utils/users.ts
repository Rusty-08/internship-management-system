import { UserSubset } from '@/app/admin/account-manager/accounts'
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
