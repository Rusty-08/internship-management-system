'use client'

import { NotFoundPage } from '@/components/@core/errors/not-found'
import { LoadingSpinner } from '@/components/@core/loading'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
import { RiEdit2Line } from "react-icons/ri"

type ProfileProps = {
  user: User | null
  children: ReactNode,
  isArchived: boolean
}

const Profile = ({ user, isArchived, children }: ProfileProps) => {
  const [data, setData] = useState<User | null>(user)
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
        formData.append('email', `${data?.email}`)
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

  if (!data) {
    return (
      <NotFoundPage className="bg-transparent from-transparent to-transparent backdrop-blur-none h-[80vh]" />
    )
  }

  return (
    <div className='flex flex-col'>
      <div
        className={cn(
          'layout-loading mb-4 min-h-40 bg-card flex flex-col justify-center rounded-md overflow-hidden w-full',
        )}
      >
        <Image
          src={profileBg}
          alt="profile-background"
          width={0}
          loading="lazy"
          height={0}
          className="w-full max-w-full object-cover max-h-60"
        />
        <div className="px-4 w-full flex lg:ps-12 min-h-20 lg:min-h-32 relative">
          <div className="absolute group -top-4 lg:-top-10 border-card bg-background hover:border-background transition-all ease-in-out duration-300 z-10 rounded-full border-[0.2rem] lg:border-[0.4rem]">
            <div className="w-20 lg:w-32 h-20 lg:h-32 overflow-hidden rounded-full">
              <Image
                src={data.image || imagePlaceholder}
                alt="profile-image"
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className={`${uploading ? 'bg-black/50' : 'bg-transparent'
                } absolute cursor-pointer w-full flex items-center justify-center h-full group-hover:bg-black/50 transition-all ease-in-out duration-300 rounded-full inset-0 border`}
            >
              {/* <IoImagesOutline
                size="2rem"
                className={cn(
                  'opacity-0 transform scale-0 text-white absolute transition-all ease-in-out duration-300 group-hover:scale-100',
                  uploading
                    ? 'group-hover:opacity-0'
                    : 'group-hover:opacity-100',
                )}
              /> */}
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
            <Button size='circle' className='border-[0.3rem] shadow-none bg-background group-hover:bg-foreground hover:text-background text-foreground p-0 w-12 h-12 border-card absolute -right-0 -bottom-0'>
              <RiEdit2Line size='1.1rem' className='mb-0.5 absolute' />
              <Input
                type="file"
                onChange={uploadUserImage}
                className="h-[8.2rem] w-full cursor-pointer rounded-full object-cover opacity-0"
              />
            </Button>
          </div>
          <div className="px-4 py-2 lg:py-4 w-3/4 lg:w-full lg:flex-grow items-start flex justify-between absolute pl-[6.5rem] left-0 lg:pl-52">
            <div className="flex flex-col flex-grow gap-0 lg:gap-2">
              <h1 className="text-lg lg:text-3xl font-semibold lg:font-bold tracking-wide">
                {data.name}
              </h1>
              <p className="text-text text-xs lg:text-sm truncate">{data.email}</p>
            </div>
            {isArchived && <Badge variant='OVERDUE' className='mt-2'>This User is no longer allowed to Sign in</Badge>}
          </div>
        </div>
      </div>
      <div className="flex flex-col">{children}</div>
    </div>
  )
}

export default Profile
