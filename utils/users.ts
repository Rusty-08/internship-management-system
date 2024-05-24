import { auth } from '@/auth'
import { UserSubset } from '@/components/@core/ui/table/account-table/types'
import prisma from '@/lib/prisma'
import { User } from '@prisma/client'

export async function getCurrentUserEmail() {
  const session = await auth()
  return session?.user.email
}

// Server-side function to get the current user by email
export async function getServerUserByEmail(email: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  return user
}

// Server-side function to get the current user by id
export async function getServerUserById(id: string) {
  const user = await prisma.user.findUnique({ where: { id } })
  return user
}

// Client-side function to get the current user by email
export async function getUserByEmail(email: string): Promise<User | null> {
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

export async function getUsers(
  isArchived: boolean,
  role?: 'INTERN' | 'MENTOR',
): Promise<UserSubset[]> {
  const users = await prisma.user.findMany({
    where: {
      role,
      isArchived: isArchived,
    },
    select: {
      id: true,
      image: true,
      name: true,
      email: true,
      role: true,
      expertise: true,
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
    role: user.role,
    expertise: user.expertise || 'none',
    mentor: user.internProfile?.mentor?.name || 'none',
    mentorId: user.internProfile?.mentor?.id || 'none',
    isArchived: isArchived,
  }))
}

// export async function getMentorUsers(): Promise<MentorUsersSubset[]> {
//   const users = await prisma.user.findMany({
//     where: {
//       role: 'MENTOR',
//     },
//     select: {
//       id: true,
//       image: true,
//       name: true,
//       email: true,
//       expertise: true,
//       isArchived: true,
//     },
//   })
//   return users.map(user => ({
//     id: user.id,
//     image: user.image,
//     name: user.name,
//     email: user.email,
//     role: user.expertise || 'none',
//     isArchived: user.isArchived,
//   }))
// }

export async function archiveAccount(id: string) {
  await prisma.user.update({
    where: { id },
    data: {
      isArchived: true,
    },
  })
}
