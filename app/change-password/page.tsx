import ChangePasswordForm from '@/components/auth/change-password/form'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Change Password',
}

const ChangePassword = () => {
  return <ChangePasswordForm />
}

export default ChangePassword
