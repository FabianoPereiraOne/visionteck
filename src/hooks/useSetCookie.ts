import { cookies } from "next/headers"
import { useCallback } from "react"

const useSetCookie = () => {
  const setCookie = useCallback(
    ({ name, value }: { name: string; value: string }) => {
      return cookies().set(name, value)
    },
    []
  )

  return { setCookie }
}

export default useSetCookie
