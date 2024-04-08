'use client'

import Image from 'next/image'
import profileBg from '@/public/general/images/profile-bg.jpg'
import noResult from '@/public/general/images/no-records.svg'
import { getUserByEmail } from '@/utils/users'
import { useEffect, useState } from 'react'
import { InternsUsersSubset } from '@/app/admin/intern-management/accounts'
import { useRouter } from 'next/navigation'
import { BreadcrumbWrapper } from '@/components/@core/breadcrumb'

const breadcrumbLinks = [
  { title: 'Intern Management', path: '/admin/intern-management' },
]

const Profile = ({ params: { profile } }: { params: { profile: string } }) => {
  const [data, setData] = useState<InternsUsersSubset | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUserByEmail(`${profile}@gmail.com`)
      if (!user) return router.push('/admin/intern-management')
      setData(user)
    }
    fetchData()
  }, [profile])

  return (
    <div className="py-2">
      <BreadcrumbWrapper links={breadcrumbLinks} current="Profile" />
      <div className="bg-muted my-6 rounded-md overflow-hidden w-full shadow">
        <Image
          src={profileBg}
          alt="profile-background"
          width="0"
          loading="lazy"
          height="0"
          className="w-full max-w-full object-cover max-h-60"
        />
        <div className="px-12 min-h-40 relative">
          <div className="w-36 h-36 absolute -top-10 bg-muted border-muted z-10 rounded-full border-[0.4rem]">
            <Image
              src={data?.image || noResult}
              alt="profile-image"
              width="0"
              height="0"
              className="w-full h-full"
            />
          </div>
          <div className="px-4 py-3 flex flex-col gap-1 absolute left-48">
            <h1 className="text-2xl font-bold tracking-wide">{data?.name}</h1>
            <p className="text-sm text-text">{data?.email}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
