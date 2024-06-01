import logo from '@/public/home/ims-logo.svg'
import Image from 'next/image'

type HeaderProps = {
  label: string
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex items-center flex-col gap-y-3">
      <Image src={logo} alt="logo" width={50} height={50} />
      <h1 className="text-[1.35rem] font-semibold text-center tracking-wide">
        {label}
      </h1>
    </div>
  )
}
