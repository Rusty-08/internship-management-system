import { auth } from '@/auth'
import { UserSubset } from '@/components/@core/ui/table/account-table/types'
import prisma from '@/lib/prisma'
import { User } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export async function getCurrentUserEmail() {
  const session = await auth()
  return session?.user.email
}

export async function getUserEmailById(id: string) {
  const user = await prisma.user.findUnique({ where: { id } })
  return user?.email
}

// Server-side function to get the current user by email
export async function getServerUserByEmail(email: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  return user
}

// Server-side function to get the current user by id
export async function getServerUserById(id: string) {
  if (!id) return null
  const user = await prisma.user.findUnique({ where: { id } })
  return user
}

// Client-side function to get the current user by email
export async function getUserByEmail(email: string): Promise<User | null> {
  if (!email) return null
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

// get mentor users in the client-side
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

// get intern users in the client-side
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

// get intern users in the server-side
export const getInternUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: 'INTERN',
        isArchived: false,
      },
      include: {
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
        attendance: true,
      },
    })
    return users.map(user => ({
      ...user,
      mentor: user.internProfile?.mentor?.name || 'none',
      mentorId: user.internProfile?.mentor?.id || '',
    }))
  } catch {
    console.log("Can't fetch the intern users")
  } finally {
    revalidatePath('/admin/intern-management')
  }
}

// get mentor users in the server-side
export const getMentorUsers = async () => {
  try {
    return await prisma.user.findMany({
      where: {
        role: 'MENTOR',
        isArchived: false,
      },
    })
  } catch {
    console.log("Can't fetch the mentor users")
  } finally {
    revalidatePath('/admin/intern-management')
  }
}

// get archived users in the server-side
export const getArchivedUsers = async () => {
  try {
    return await prisma.user.findMany({
      where: {
        isArchived: true,
      },
    })
  } catch {
    console.log("Can't fetch the archived users")
  } finally {
    revalidatePath('/admin/archived-records')
  }
}

// ask for intern id and return mentor id
export const getCurrentUserMentorId = async () => {
  const user = await getCurrentUser()
  const mentor = await prisma.user.findUnique({
    where: { id: user?.id },
    select: {
      internProfile: {
        select: {
          mentor: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  })
  return mentor?.internProfile?.mentor?.id || ''
}

export async function archiveAccount(id: string) {
  await prisma.user.update({
    where: { id },
    data: {
      isArchived: true,
    },
  })
}
