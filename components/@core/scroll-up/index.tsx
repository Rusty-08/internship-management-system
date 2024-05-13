'use client'

import { Button } from '@/components/ui/button'
import React, { useState, useEffect } from 'react'
import { CustomIcon } from '@/components/@core/iconify'
import { cn } from '@/lib/utils'
import { Link, animateScroll as scroll } from 'react-scroll'

const ScrollUp = () => {
  const [isVisible, setIsVisible] = useState(false)

  const checkScroll = () => {
    if (window.scrollY > window.innerHeight * 1.5) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', checkScroll)
    return () => window.removeEventListener('scroll', checkScroll)
  }, [])

  return (
    <Button
      onClick={() => scroll.scrollToTop({ duration: 300 })}
      variant="secondary"
      className={cn(
        'fixed bottom-8 pb-1 right-6 shadow-md transform transition-all duration-300 ease-in-out',
        isVisible
          ? 'opacity-100 scale-100'
          : 'opacity-0 scale-0 pointer-events-none',
      )}
      size="circle"
    >
      <CustomIcon icon="carbon:chevron-up" />
    </Button>
  )
}

export default ScrollUp
