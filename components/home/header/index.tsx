import { CustomIcon } from '@/components/iconify'

type SectionHeaderProps = {
  header: string
  subHeader: string
}

const SectionHeader = ({ header, subHeader }: SectionHeaderProps) => {
  return (
    <div className="mb-10 w-full flex text-center flex-col items-center">
      <CustomIcon
        icon="pepicons-print:dots-x"
        className="text-primary"
        width={40}
      />
      <h1 className="text-3xl font-semibold leading-6 mb-4">{header}</h1>
      <p className="text-text sm:px-0 md:px-[15%] lg:px-[15%]">{subHeader}</p>
    </div>
  )
}

export default SectionHeader
