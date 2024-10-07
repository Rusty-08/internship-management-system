export const getOrdinalSuffix = (number: number, withNumber = true) => {
  const suffixes = ["th", "st", "nd", "rd"]
  const value = number % 100
  const suffix = suffixes[(value - 20) % 10] || suffixes[value] || suffixes

  return withNumber ? number.toString() + suffix : suffix
}