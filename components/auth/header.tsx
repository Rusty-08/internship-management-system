type HeaderProps = {
  label: string
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col">
      <h1 className="text-xl text-center font-semibold">{label}</h1>
    </div>
  )
}
