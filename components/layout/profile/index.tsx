'use client'

import { NotFoundPage } from '@/components/@core/errors/not-found'
import { LoadingSpinner } from '@/components/@core/loading'
import { Input } from '@/components/ui/input'
import { uploadImage } from '@/lib/upload-image'
import { cn } from '@/lib/utils'
import imagePlaceholder from '@/public/general/images/male-avatar.svg'
import profileBg from '@/public/general/images/profile-bg.jpg'
import { getUserByEmail } from '@/utils/users'
import { User } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'
import { IoImagesOutline } from 'react-icons/io5'

type ProfileProps = {
  email: string
  children: ReactNode
}

const Profile = ({ email, children }: ProfileProps) => {
  const [data, setData] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const router = useRouter()

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setUploading(true)
      try {
        const formData = new FormData()
        formData.append('image', file)
        formData.append('email', email)
        const user = await uploadImage(formData)
        setData(user)
      } catch (error) {
        // Handle upload error
      } finally {
        setUploading(false)
        router.refresh()
      }
    }
  }

  const { mutate: uploadUserImage } = useMutation({
    mutationFn: handleFileChange,
  })

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const user = await getUserByEmail(email)
      setData(user)
      setLoading(false)
    }
    fetchData()
  }, [email, router])

  if (!loading && !data) {
    return (
      <NotFoundPage className="bg-transparent from-transparent to-transparent backdrop-blur-none h-[80vh]" />
    )
  }

  return (
    <>
      <div
        className={cn(
          'layout-loading mb-4 bg-card flex flex-col justify-center rounded-md overflow-hidden w-full',
          loading ? 'h-[23rem]' : 'min-h-40'
        )}
      >
        {loading && <LoadingSpinner width="4rem" />}
        {data && !loading && (
          <>
            <Image
              src={profileBg}
              alt="profile-background"
              width={0}
              loading="lazy"
              height={0}
              className="w-full max-w-full object-cover max-h-60"
            />
            <div className="px-12 min-h-32 relative">
              <div className="w-36 group h-36 overflow-hidden absolute -top-10 bg-muted border-muted hover:bo rder-primary/10 transition-all ease-in-out duration-300 z-10 rounded-full border-[0.4rem]">
                <Image
                  src={data.image || imagePlaceholder}
                  alt="profile-image"
                  width={200}
                  height={200}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div
                  className={`${
                    uploading ? 'bg-black/50' : 'bg-transparent'
                  } absolute cursor-pointer w-full flex items-center justify-center h-full group-hover:bg-black/50 transition-all ease-in-out duration-300 rounded-full inset-0 border`}
                >
                  <IoImagesOutline
                    size="2rem"
                    className={cn(
                      'opacity-0 transform scale-0 text-white absolute transition-all ease-in-out duration-300 group-hover:scale-100',
                      uploading
                        ? 'group-hover:opacity-0'
                        : 'group-hover:opacity-100',
                    )}
                  />
                  <Input
                    type="file"
                    onChange={uploadUserImage}
                    className="h-[8.2rem] w-full cursor-pointer rounded-full object-cover opacity-0"
                  />
                  {uploading && (
                    <LoadingSpinner
                      styles={{
                        position: 'absolute',
                        left: 'calc(50% - 1.5rem)',
                      }}
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
      {!loading && <div className="flex flex-col">{children}</div>}
    </>
  )
}

export default Profile
