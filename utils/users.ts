import { InternsUsersSubset } from '@/app/admin/intern-management/_components/accounts-columns'
import { MentorUsersSubset } from '@/app/admin/mentor-management/_components/accounts-column'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/lib/prisma'
import { User } from '@prisma/client'
import { Session, getServerSession } from 'next-auth'

export async function getCurrentUserEmail() {
  const session = await getServerSession(authOptions)
  const { email } = (session?.user as Session['user']) || {}
  return email
}

// Server-side function to get the current user by email
export async function getServerUserByEmail(email: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  return user
}

// Client-side function to get the current user by email
export async function getUserByEmail(email: string) {
  const res = await fetch(`/api/auth/users/user/${email}`, {
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

// Server-side function to get the current user
export async function getCurrentUser() {
  const email = await getCurrentUserEmail()
  const user = await prisma.user.findUnique({ where: { email } })
  return user
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
