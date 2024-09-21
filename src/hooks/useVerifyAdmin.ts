import { cookieAuth } from "@/schemas/others/config"
import { cookies } from "next/headers"
import { NextRequest } from "next/server"
import { useReturnDecoded } from "./useReturnDecoded"
import { useVerifyServerToken } from "./useVerifyServerToken"

export const useVerifyAdmin = async (request?: NextRequest) => {
  const token =
    request?.headers?.get("Authorization") ?? cookies().get(cookieAuth)?.value

  if (!token) return { isAdmin: false }

  const decodedToken = await useReturnDecoded(token)
  const logged: any = await useVerifyServerToken(decodedToken)

  if (!logged?.status || logged?.data?.type !== "ADMIN")
    return { isAdmin: false }

  return { isAdmin: true }
}
