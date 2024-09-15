'use client'

import { LoadingSpinner } from '@/components/@core/loading'
import { siteConfig } from '@/configs/site'
import { useTheme } from 'next-themes'
import Image from 'next/image'

const Loading = () => {
  const { theme: initialTheme } = useTheme()

  return (
    <div className="layout-loading flex items-center justify-center gap-4 flex-col w-full h-full">
      <div className="flex items-center flex-col justify-center overflow-hidden">
        <Image
          src={siteConfig.logoPlaceholder}
          alt="logo"
          width={50}
          height={50}
          className="flex-shrink-0 mb-2"
        />
        <h1 className="font-bold text-[1.5rem] tracking-wider text-sky-50">
          INTERNSHIP PORTAL
        </h1>
        <p className="font-medium text-[0.8rem] leading-3 tracking-[0.15rem] text-text">
          BAROQUE WORKS, LLC
        </p>
      </div>
      <div className="h-8 mb-4 flex items-center justify-center">
        <LoadingSpinner width="4rem" />
      </div>
    </div>
  )
}

export default Loading
