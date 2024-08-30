import { NextRequest } from "next/server"
import { useReturnDecoded } from "./useReturnDecoded"
import { useVerifyToken } from "./useVerifyToken"

export const useVerifyAdmin = async (request: NextRequest) => {
  const token = new Headers(request.headers).get("Authorization")

  if (!token) return { isAdmin: false }

  const decodedToken = await useReturnDecoded(token)
  const logged: any = await useVerifyToken(decodedToken)

  if (!logged?.status || logged?.data?.type !== "ADMIN")
    return { isAdmin: false }

  return { isAdmin: true }
}
