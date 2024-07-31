import { PayloadType } from "@/types/payload"
import { verify } from "@/utils/jwt"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"

export const useReturnDecoded = async (
  authorization: RequestCookie | undefined
) => {
  if (!authorization) return null

  const token = authorization?.value ?? ""
  const decoded = await verify(token)

  if (typeof decoded != "string")
    return {
      id: decoded.payload?.id,
      email: decoded.payload?.email,
      type: decoded.payload?.type
    } as PayloadType

  return null
}
