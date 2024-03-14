import prisma from './prisma'

export const connectDB = async () => {
  try {
    await prisma.$connect()
  } catch (error) {
    console.error(error)
    throw new Error('Could not connect to database')
  }
}
