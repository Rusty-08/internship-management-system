import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { User } from '@prisma/client'
import { revalidatePath, unstable_noStore as noStore } from 'next/cache'
import { getAllBatchInServer, getBatchById } from './batch'
import { UserSubset } from '@/components/@core/ui/table/account-table/types'

export async function getCurrentUserEmail() {
  const session = await auth()
  return session?.user.email
}

export async function getUserById(id: string) {
  if (id === 'create-user') return null

  const user = await prisma.user.findUnique({
    where: { id, isArchived: false },
  })

  return user
}

export async function getClientUserById(id: string): Promise<User | null> {
  if (id === 'create-user') return null

  const res = await fetch(`/api/users/user/${id}`, {
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
export async function getServerUserById(id: string, isArchived?: boolean) {
  if (!id) {
    const user = await getCurrentUser()
    return user
  }

  const user = await prisma.user.findUnique({
    where: { id, isArchived },
    include: {
      attendance: true,
    },
  })

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

  const user = await prisma.user.findUnique({
    where: { email, isArchived: false },
    include: {
      attendance: true,
    },
  })

  return user
}

// get mentor users in the client-side
export const fetchMentorUsers = async (): Promise<UserSubset[] | null> => {
  const res = await fetch('/api/auth/users/mentors', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (res.ok) {
    const data = (await res.json()) as UserSubset[]

    const interns = await fetchInternUsers()
    const internsWithMentors = interns?.flatMap(intern => intern.mentorId)

    return data.filter(mentor => !internsWithMentors?.includes(mentor.id))
  } else {
    return null
  }
}

// get intern users in the client-side
export const fetchInternUsers = async (): Promise<User[] | null> => {
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
export const getInternUsers = async (withNoMentors?: boolean) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: 'INTERN',
        isArchived: false,
      },
      include: {
        attendance: true,
      },
    })

    if (withNoMentors) {
      return users
    }

    const usersWithMentors = await Promise.all(
      users.map(async user => {
        const mentor = user.mentorId
          ? await getServerUserById(user.mentorId)
          : null

        return {
          ...user,
          mentor: mentor ? mentor.name : null,
        }
      }),
    )

    return usersWithMentors
  } catch {
    console.log("Can't fetch the intern users")
  }
}

export const getMentorUsers = async () => {
  try {
    const mentors = await prisma.user.findMany({
      where: {
        role: 'MENTOR',
        isArchived: false,
      },
    })

    const interns = await prisma.user.findMany({
      where: {
        role: 'INTERN',
        isArchived: false,
      },
    })

    const formattedMentors = mentors.flatMap(mentor => {
      const assignedInterns = interns.filter(
        intern => intern.mentorId === mentor.id,
      )

      return assignedInterns.map(intern => ({
        ...mentor,
        assignedIntern: intern.name,
        batchId: intern.batchId,
      }))
    })

    const mentorsWithBatch = await Promise.all(
      formattedMentors.map(async mentor => {
        if (mentor.batchId) {
          const batch = await getBatchById(mentor.batchId)
          return { ...mentor, batch: batch?.name }
        }
        return mentor
      }),
    )

    return mentorsWithBatch
  } catch {
    console.log("Can't fetch the mentor users")
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
  return user?.mentorId
}

export async function archiveAccount(id: string) {
  await prisma.user.update({
    where: { id },
    data: {
      isArchived: true,
    },
  })
}
