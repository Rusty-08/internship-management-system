import { ReactNode } from 'react'
import { FormLabel } from './form'
import { PiAsteriskSimpleDuotone } from "react-icons/pi"

export const RequiredLabel = ({ children }: { children: ReactNode }) => {
  return (
    <FormLabel className='relative'>
      {children}
      <PiAsteriskSimpleDuotone className='absolute text-destructive -right-4 top-0' size='0.7rem' />
    </FormLabel>
  )
}
