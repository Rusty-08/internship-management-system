import { User } from '@prisma/client'

export async function saveImage(
  email: string,
  picture: string,
): Promise<User | null> {
  const res = await fetch('/api/profile/save-image', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      picture,
    }),
  })

  if (res.ok) {
    const data = res.json()
    return data
  } else {
    return null
  }
}
