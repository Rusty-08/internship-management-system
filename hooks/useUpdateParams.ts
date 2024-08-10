import { usePathname, useRouter, useSearchParams } from "next/navigation"

export const useUpdateParams = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams)

    if (value && value !== 'all') {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    replace(`${pathname}?${params.toString()}`)
  }

  return { searchParams, updateParams }
}