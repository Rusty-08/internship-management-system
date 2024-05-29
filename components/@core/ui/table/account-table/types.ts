export type UserSubset = {
  id: string | null
  image: string | null
  name: string | null
  email: string | null
  role: string | null
  expertise?: string | null
  mentor?: string | null
  mentorId?: string | null
  isArchived?: boolean | null
}