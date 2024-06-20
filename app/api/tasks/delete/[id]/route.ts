import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function DELETE(
  request: Request,
  { params: { id } }: { params: { id: string } },
) {
  try {
    const deleteTask = await prisma.task.delete({
      where: { id },
    })

    if (deleteTask) {
      return NextResponse.json(
        { message: 'The task has been successfully deleted' },
        { status: 201 },
      )
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Could not delete the task' },
      { status: 404 },
    )
  } finally {
    prisma.$disconnect()
    revalidatePath('/mentor/tasks-management')
  }
}
