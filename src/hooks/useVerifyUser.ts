"use server"
import { cookieAuth } from "@/schemas/others/config"
import { cookies } from "next/headers"
import { NextRequest } from "next/server"
import { useReturnDecoded } from "./useReturnDecoded"
import { useVerifyToken } from "./useVerifyToken"

export const useVerifyUser = async (request: NextRequest) => {
  const token =
    request?.headers?.get("Authorization") ?? cookies().get(cookieAuth)?.value

  if (!token) return { isUser: false, data: null }

  const decodedToken = await useReturnDecoded(token)
  const logged = await useVerifyToken(decodedToken)

  if (!logged.status) return { isUser: false, data: null }

  return { isUser: true, data: decodedToken }
}
