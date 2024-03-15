type SectionHeaderProps = {
  header: string
  subHeader: string
}

const SectionHeader = ({ header, subHeader }: SectionHeaderProps) => {
  return (
    <div className="space-y-4 mb-10 w-full text-center">
      <h1 className="text-3xl font-semibold leading-6">{header}</h1>
      <p className="text-text sm:px-0 md:px-[15%] lg:px-[15%]">{subHeader}</p>
    </div>
  )
}

export default SectionHeader
