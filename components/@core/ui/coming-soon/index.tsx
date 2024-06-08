export const ComingSoon = ({ pageName }: { pageName: string }) => {
  return (
    <div className="h-full flex items-center justify-center flex-col">
      <h1 className="text-2xl mb-2 font-semibold">This is {pageName}</h1>
      <h1 className="text-text">Coming soon...</h1>
    </div>
  )
}
