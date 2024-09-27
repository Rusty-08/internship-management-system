'use server'

import prisma from "@/lib/prisma"
import { getBatchById } from "@/utils/batch"
import { getServerUserById } from "@/utils/users"
import { revalidatePath } from "next/cache"

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
        const batch = await getBatchById(user.batchId || '')

        if (user.mentorId) {
          const mentor = await getServerUserById(user.mentorId)

          return {
            ...user,
            mentor: mentor?.name,
            batch: batch?.name
          }
        }

        return {
          ...user,
          mentor: null,
          batch: batch?.name
        }
      })
    )

    return usersWithMentors
  } catch {
    console.log("Can't fetch the intern users")
  } finally {
    revalidatePath('/admin/intern-management')
  }
}