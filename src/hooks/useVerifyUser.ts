import { NextRequest } from "next/server"
import { useReturnDecoded } from "./useReturnDecoded"
import { useVerifyToken } from "./useVerifyToken"

export const useVerifyUser = async (request: NextRequest) => {
  const token = new Headers(request.headers).get("Authorization")

  if (!token) return { isUser: false }

  const decodedToken = await useReturnDecoded(token)
  const logged = await useVerifyToken(decodedToken)

  if (!logged.status) return { isUser: false }

  return { isUser: true }
}
