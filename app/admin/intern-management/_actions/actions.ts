'use server'

import { RegistrationSchema } from "@/components/@core/ui/table/account-table/registration-schema"
import prisma from "@/lib/prisma"
import { getBatchById } from "@/utils/batch"
import { getServerUserById } from "@/utils/users"
import { User } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import bcrypt from 'bcryptjs'
import generator from 'generate-password'
import sgMail from '@/components/email/send-grid'
import { NEWUSER_TEMPLATE } from '@/components/email/new-user-temp'

export type AccountFormState = {
  status: 'error' | 'success'
  data: User | null
  message: string
}

type UserSchema = z.infer<typeof RegistrationSchema>

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

export const updatenUser = async (user: UserSchema): Promise<AccountFormState | undefined> => {
  try {
    if (!user) throw new Error('No user found')

    const selectedUser = await prisma.user.findUnique({
      where: { id: user.id }
    })

    // if the user change its email: verify if it is already taken or not
    if (selectedUser?.email !== user.email) {
      const emailIsTaken = await prisma.user.findUnique({
        where: { email: user.email }
      })

      if (emailIsTaken) {
        return {
          status: 'error',
          data: null,
          message: 'The email address is already taken'
        }
      }
    }

    const common = {
      name: user.name,
      email: user.email,
      isArchived: user.isArchived,
    }

    let updatedUser

    console.log(user.role)
    console.log(user.mentorId)

    if (user.role === 'INTERN') {
      updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          ...common,
          course: user.course,
          mentorId: user.mentorId || null,
          batchId: user.batchId,
          totalHours: user.totalHours,
        },
      })
    } else {
      updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          ...common,
          expertise: user.expertise
        },
      })
    }

    if (updatedUser) {
      console.log(updatedUser)
      return { status: 'success', data: updatedUser, message: '' }
    }
  } catch {
    return { status: 'error', data: null, message: '' }
  } finally {
    revalidatePath(`/admin/${user.role?.toLowerCase()}-management`)
  }
}

export const registerUser = async (user: UserSchema): Promise<AccountFormState | undefined> => {
  try {
    const emailIsTaken = await prisma.user.findUnique({
      where: { email: user.email }
    })

    if (emailIsTaken) {
      return {
        status: 'error',
        data: null,
        message: 'The email address is already taken'
      }
    }

    const password = generator.generate({
      length: 10,
      numbers: true
    })

    const hashedPassword = await bcrypt.hash(password, 10)

    let createdUser

    const data = {
      name: user.name,
      email: user.email,
      password: hashedPassword,
      role: user.role,
      isArchived: false,
    }

    if (user.role === 'INTERN') {
      createdUser = await prisma.user.create({
        data: {
          ...data,
          batchId: user.batchId,
          course: user.course,
          totalHours: user.totalHours,
          mentorId: user.mentorId
        },
      })
    } else {
      createdUser = await prisma.user.create({
        data: {
          ...data,
          expertise: user.expertise,
        },
      })
    }

    if (createdUser) {
      // the inputed email will receive the default password that will be use to sign in
      const msg = {
        to: user.email,
        from: `${process.env.SENDER_EMAIL}`,
        subject: 'IMS Account Registration',
        html: NEWUSER_TEMPLATE(password),
      }

      sgMail.send(msg).then(() => {
        console.log('Email sent')
      }).catch((error) => {
        console.error(error)
      })

      return { status: 'success', data: createdUser, message: '' }
    } else {
      return { status: 'error', data: null, message: 'Failed to create the account' }
    }
  } catch {
    return { status: 'error', data: null, message: 'Failed to create the account' }
  } finally {
    await prisma.$disconnect()
    revalidatePath(`/admin/${user.role?.toLowerCase()}-management`)
  }
}

