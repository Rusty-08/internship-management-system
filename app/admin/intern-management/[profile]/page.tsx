'use client'

import Image from 'next/image'
import profileBg from '@/public/general/images/profile-bg.jpg'
import { getUserByEmail } from '@/utils/users'
import { useEffect, useState } from 'react'
import { InternsUsersSubset } from '@/app/admin/intern-management/accounts'
import { useRouter } from 'next/navigation'
import { BreadcrumbWrapper } from '@/components/@core/breadcrumb'
import { LoadingSpinner } from '@/components/@core/spinner/circular'
import { NotFoundPage } from '@/app/not-found'
import { Input } from '@/components/ui/input'
import { CustomIcon } from '@/components/@core/iconify'
import { saveImage } from '@/utils/saveImage'

const breadcrumbLinks = [
  { title: 'Intern Management', path: '/admin/intern-management' },
]

const Profile = ({ params: { profile } }: { params: { profile: string } }) => {
  const [data, setData] = useState<InternsUsersSubset | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const router = useRouter()

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      const reader = new FileReader()

      reader.onloadend = async () => {
        setUploading(true)
        const base64String = reader.result as string
        const updatedUser = await saveImage(
          data?.email ? data.email : '',
          base64String,
        )
        setData(updatedUser)
        setUploading(false)
      }

      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const user = await getUserByEmail(`${profile}@gmail.com`)
      setData(user)
      setLoading(false)
    }
    fetchData()
  }, [profile, router])

  if (!loading && !data) {
    return <NotFoundPage />
  }

  return (
    <div className="space-y-6 pt-2">
      <BreadcrumbWrapper links={breadcrumbLinks} current="Profile" />
      <div className="bg-muted flex flex-col justify-center rounded-md overflow-hidden min-h-40 w-full shadow">
        {loading && <LoadingSpinner size={40} />}
        {data && !loading && (
          <>
            <Image
              src={profileBg}
              alt="profile-background"
              width="0"
              loading="lazy"
              height="0"
              className="w-full max-w-full object-cover max-h-60"
            />
            <div className="px-12 min-h-40 relative">
              <div className="w-36 group h-36 overflow-hidden absolute -top-10 bg-muted border-muted hover:border-primary/10 transition-all ease-in-out duration-300 z-10 rounded-full border-[0.4rem]">
                <Image
                  src={data.image || ''}
                  alt="profile-image"
                  width="0"
                  height="0"
                  className="w-full absolute h-full object-cover"
                />
                <div
                  className={`${
                    uploading ? 'bg-black/50' : 'bg-transparent'
                  } absolute cursor-pointer w-full flex items-center justify-center h-full group-hover:bg-black/50 transition-all ease-in-out duration-300 rounded-full inset-0 border`}
                >
                  <CustomIcon
                    icon="mage:image-upload"
                    width={40}
                    height={40}
                    className="opacity-0 transform scale-0 text-white absolute group-hover:opacity-100 transition-all ease-in-out duration-300 group-hover:scale-100"
                  />
                  <Input
                    type="file"
                    onChange={handleFileChange}
                    className="h-[8.2rem] w-full cursor-pointer rounded-full object-cover opacity-0"
                  />
                  {uploading && (
                    <LoadingSpinner
                      style={{ left: 'calc(50% - 12.5px)' }}
                      className="absolute stroke-white"
                      size={25}
                    />
                  )}
                </div>
              </div>
              <div className="px-4 py-3 flex flex-col gap-2 absolute left-48">
                <h1 className="text-2xl font-bold tracking-wide">
                  {data.name}
                </h1>
                <p className="text-text text-sm">{data.email}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Profile
