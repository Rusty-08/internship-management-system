'use client'

import animationData from './loading-animation.json'
import Lottie from 'lottie-react'

export interface ISVGProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string
  styles?: React.CSSProperties
}

export const LoadingSpinner = ({
  styles,
  width = '3rem',
  ...props
}: ISVGProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Lottie
        animationData={animationData}
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid slice',
        }}
        className="loading"
        style={{
          width,
          ...styles,
        }}
      />
    </div>
  )
}
