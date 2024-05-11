import React, { ReactNode } from 'react'

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-muted bg-gradient-to-r from-primary/20 to-fuchsia-900/20 backdrop-blur-sm">
      {children}
    </div>
  )
}

export default AuthLayout
