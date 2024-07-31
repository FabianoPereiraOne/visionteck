import { useReturnDecoded } from "./useReturnDecoded"
import { useVerifyToken } from "./useVerifyToken"

export const useVerifyAdmin = async (token: string | null) => {
  if (!token) return false
  const decodedToken = await useReturnDecoded(token)
  const logged = await useVerifyToken(decodedToken)

  if (!logged.status || logged.data?.type !== "ADMIN") return false

  return true
}
