'use client'

import { LoadingSpinner } from '@/components/@core/loading'
import { siteConfig } from '@/configs/site'
import { useTheme } from 'next-themes'
import Image from 'next/image'

const Loading = () => {
  const { theme: initialTheme } = useTheme()

  return (
    <div className="layout-loading flex items-center justify-center gap-4 flex-col w-full h-full">
      <Image
        // src={
        //   initialTheme === 'light'
        //     ? siteConfig.logoCircleBlack
        //     : siteConfig.logoCircleWhite
        // }
        src={siteConfig.logoPlaceholder}
        alt="logo"
        width={60}
        height={60}
      />
      <div className="h-8 mb-4 flex items-center justify-center">
        <LoadingSpinner width="4rem" />
      </div>
    </div>
  )
}

export default Loading
