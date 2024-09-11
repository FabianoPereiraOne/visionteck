import { cookieAuth } from "@/schemas/others/config"
import { cookies } from "next/headers"
import { useReturnDecoded } from "./useReturnDecoded"
import { useVerifyToken } from "./useVerifyToken"

export const useVerifyUser = async () => {
  const token = cookies().get(cookieAuth)?.value

  if (!token) return { isUser: false }

  const decodedToken = await useReturnDecoded(token)
  const logged = await useVerifyToken(decodedToken)

  if (!logged.status) return { isUser: false }

  return { isUser: true }
}
