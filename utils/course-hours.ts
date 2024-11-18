import { InternCourse } from '@prisma/client'

type Courses = InternCourse | null | undefined

export const calculateCourseHours = (course: Courses) => {
  switch (course) {
    case 'BSIT':
      return 480
    case 'BSIS':
      return 480
    case 'BSCS':
      return 120
    default:
      return 0
  }
}
