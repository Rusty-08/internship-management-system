'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { IoWarningOutline } from 'react-icons/io5'

const Denied = () => {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="w-full h-screen flex items-center flex-col justify-center bg-muted bg-gradient-to-r from-primary/20 to-fuchsia-900/20 backdrop-blur-sm">
      <Card className="flex items-center flex-col">
        <CardHeader>
          <IoWarningOutline size="3rem" className="text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-2">
            <h1 className="text-xl font-semibold">Unauthorized Access</h1>
            <p className="text-text">
              You don&apos;t have permission to access this page
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleBack}>Back to previous Page</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Denied
