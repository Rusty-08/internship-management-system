import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const batches = await prisma.batch.findMany()

    if (!batches) {
      return NextResponse.json({ message: 'No Batches Exists' }, { status: 401 })
    }

    return NextResponse.json(batches, { status: 200 })
  } catch (error) {
    console.log('Error:', error)
    return NextResponse.json(
      { message: 'Could not get batches' },
      { status: 404 },
    )
  }
}
