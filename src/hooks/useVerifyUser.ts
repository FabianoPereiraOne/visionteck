import { cookieAuth } from "@/schemas/others/config"
import { cookies } from "next/headers"
import { NextRequest } from "next/server"
import { useReturnDecoded } from "./useReturnDecoded"
import { useVerifyToken } from "./useVerifyToken"

export const useVerifyUser = async (request: NextRequest) => {
  const token =
    new Headers(request.headers).get(cookieAuth) ??
    cookies().get(cookieAuth)?.value

  if (!token) return { isUser: false }

  const decodedToken = await useReturnDecoded(token)
  const logged = await useVerifyToken(decodedToken)

  if (!logged.status) return { isUser: false }

  return { isUser: true }
}
