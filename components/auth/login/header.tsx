import logo from '@/public/home/ims-logo.svg'
import Image from 'next/image'

type HeaderProps = {
  label: string
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex items-center flex-col gap-y-3">
      {/* <div className="flex items-center gap-1">
        <Image src={logo} alt="logo" width={50} height={50} />
        <h1 className="font-bold text-3xl tracking-wide bg-gradient-to-r from-primary to-fuchsia-900 bg-clip-text text-transparent">
          IMS
        </h1>
      </div> */}
      <h1 className="text-2xl font-semibold text-center tracking-wide">
        {label}
      </h1>
    </div>
  )
}
