import { useReturnDecoded } from "./useReturnDecoded"
import { useVerifyToken } from "./useVerifyToken"

export const useVerifyAdmin = async (token: string | null) => {
  if (!token) return false
  const decodedToken = await useReturnDecoded(token)
  const isLogged = await useVerifyToken(decodedToken)

  if (!isLogged || decodedToken?.type !== "ADMIN") return false

  return true
}
