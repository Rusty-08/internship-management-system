import { UserSubset } from '@/app/admin/mentor-management/accounts'
import prisma from '@/lib/prisma'
import { UserRole } from '@prisma/client'

type User = {
  email: string
  passwordChangeRequired: boolean
  role: UserRole | null
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const res = await fetch('/api/auth/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
    }),
  })

  if (res.ok) {
    return res.json()
  } else {
    return null
  }
}

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
