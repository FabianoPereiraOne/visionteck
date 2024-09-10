import { userSession } from "@/schemas/others/config"
import { useCallback } from "react"

const useGetUserData = () => {
  const getUserData = useCallback(() => {
    if (typeof window !== "undefined") {
      const data = sessionStorage.getItem(userSession)
      const userData = data ? JSON.parse(data) : null
      return userData
    }

    return null
  }, [])

  return { getUserData }
}

export default useGetUserData
