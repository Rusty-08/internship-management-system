'use client'

import { Button } from '@/components/ui/button'
import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Link, animateScroll as scroll } from 'react-scroll'
import { HiChevronUp } from 'react-icons/hi2'

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
      className={cn(
        'fixed bottom-8 pb-1 right-6 shadow-md transform transition-all duration-300 ease-in-out',
        isVisible
          ? 'opacity-100 scale-100'
          : 'opacity-0 scale-0 pointer-events-none',
      )}
      size="circle"
    >
      <HiChevronUp size="1.1rem" />
    </Button>
  )
}

export default ScrollUp
