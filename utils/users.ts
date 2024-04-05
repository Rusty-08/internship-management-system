import { InternsUsersSubset } from '@/app/admin/intern-management/accounts'
import { MentorUsersSubset } from '@/app/admin/mentor-management/accounts'
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
    const data = res.json()
    return data
  } else {
    return null
  }
}

export const fetchMentorUsers = async () => {
  const res = await fetch('/api/auth/users/mentors', {
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

export const fetchInternUsers = async () => {
  const res = await fetch('/api/auth/users/interns', {
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

export async function getInternUsers(): Promise<InternsUsersSubset[]> {
  const users = await prisma.user.findMany({
    where: {
      role: 'INTERN',
    },
    select: {
      id: true,
      image: true,
      name: true,
      email: true,
      internProfile: {
        select: {
          mentor: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  })
  return users.map(user => ({
    id: user.id,
    image: user.image,
    name: user.name,
    email: user.email,
    mentor: user.internProfile?.mentor?.name || 'none',
    mentorId: user.internProfile?.mentor?.id || 'none',
  }))
}

export async function getMentorUsers(): Promise<MentorUsersSubset[]> {
  const users = await prisma.user.findMany({
    where: {
      role: 'MENTOR',
    },
    select: {
      id: true,
      image: true,
      name: true,
      email: true,
      expertise: true,
    },
  })
  return users.map(user => ({
    id: user.id,
    image: user.image,
    name: user.name,
    email: user.email,
    role: user.expertise || 'none',
  }))
}
