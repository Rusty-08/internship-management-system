import { PiDotsThreeDuotone } from 'react-icons/pi'

type SectionHeaderProps = {
  header: string
  subHeader: string
}

const SectionHeader = ({ header, subHeader }: SectionHeaderProps) => {
  return (
    <div className="mb-14 w-full flex text-center flex-col items-center">
      <PiDotsThreeDuotone className="text-primary mb-2" size="2rem" />
      <h1 className="text-2xl lg:text-3xl font-semibold leading-4 lg:leading-6 mb-6">
        {header}
      </h1>
      <p className="text-text sm:px-0 md:px-[15%] lg:px-[20%]">{subHeader}</p>
    </div>
  )
}

export default SectionHeader
