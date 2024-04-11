import { InternsUsersSubset } from '@/app/admin/intern-management/accounts'

export async function saveImage(
  email: string,
  picture: string,
): Promise<InternsUsersSubset | null> {
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
