'use server'

import { z } from "zod"
import { BatchWithUsers } from "../_components/batch-schema"
import prisma from "@/lib/prisma"
import bcrypt from 'bcryptjs'
import generator from 'generate-password'
import { BatchStatus, User } from "@prisma/client"
import { isBefore, isWithinInterval } from "date-fns"
import { revalidatePath } from "next/cache"

export const calculateBatchStatus = async (startDate: Date, endDate: Date | undefined) => {
  let status: BatchStatus = BatchStatus.PENDING
  const now = new Date()

  if (isBefore(now, startDate)) {
    status = BatchStatus.PENDING
  } else if (!endDate || isWithinInterval(now, { start: startDate, end: endDate })) {
    status = BatchStatus.ONGOING
  } else {
    status = BatchStatus.COMPLETED
  }

  return status
}


export const addBatch = async (data: z.infer<typeof BatchWithUsers>) => {
  const { batchName, startDate, endDate, interns } = data

  let status = await calculateBatchStatus(startDate, endDate)

  try {
    const batch = await prisma.batch.create({
      data: {
        name: batchName,
        startDate,
        endDate: endDate,
        status
      },
    })

    if (interns) {
      const password = generator.generate({
        length: 10,
        numbers: true
      })

      const hashedPassword = await bcrypt.hash(password, 10)

      const newUsers = interns.map(user => {
        return {
          ...user,
          batchId: batch.id,
          password: hashedPassword,
          role: 'INTERN',
        } as User
      })

      await prisma.user.createMany({
        data: newUsers,
      })

      revalidatePath('/admin/internship-management')
    }
  } catch {
    console.log('Unable to add batch')
  }
}

export const updateBatch = async (data: z.infer<typeof BatchWithUsers>) => {
  const { id, batchName, startDate, endDate, interns } = data

  try {
    const batchUpdate = await prisma.batch.findUnique({
      where: { id },
    })

    if (!batchUpdate) {
      throw new Error('Batch not found')
    }

    let status = await calculateBatchStatus(startDate, endDate)

    const updated = await prisma.batch.update({
      where: { id },
      data: {
        name: batchName,
        startDate,
        endDate,
        status
      }
    })

    console.log(updated)

    const mappedInterns = interns?.map(({ mentorId, ...intern }) => {
      return {
        ...intern,
        mentorId: mentorId || null
      }
    })

    if (mappedInterns && mappedInterns.length > 0) {
      await Promise.all(mappedInterns.map(async ({ id, ...intern }) => {
        await prisma.user.update({
          where: { id },
          data: intern,
        })
      }))
    }

    if (updated) {
      revalidatePath('/admin/internship-management')
      return updated
    }
  } catch (error: any) {
    console.error('Unable to update the batch:', error.message)
    throw new Error('Unable to update the batch')
  }
}