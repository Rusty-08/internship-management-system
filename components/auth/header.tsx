type HeaderProps = {
  label: string
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4">
      <h1 className="text-xl font-semibold text-center uppercase">{label}</h1>
    </div>
  )
}
