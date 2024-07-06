import { NotFoundPage } from '@/components/@core/errors/not-found'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Not Found',
}

const NotFound = () => {
  return <NotFoundPage />
}

export default NotFound
