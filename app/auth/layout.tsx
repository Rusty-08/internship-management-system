import React, { ReactNode } from 'react'

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-full items-center justify-center bg-muted-foreground/10">
      {children}
    </div>
  )
}

export default AuthLayout
