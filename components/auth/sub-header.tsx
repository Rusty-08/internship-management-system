type Description = {
  label: string
}

export const SubHeader = ({ label }: Description) => {
  return (
    <div className="w-full text-center">
      <p>{label}</p>
    </div>
  )
}
