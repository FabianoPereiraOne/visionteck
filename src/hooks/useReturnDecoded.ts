import { PayloadType } from "@/types/payload"
import { verify } from "@/utils/jwt"

export const useReturnDecoded = async (
  authorization: string | null | undefined
) => {
  if (!authorization) return null

  try {
    const decoded = await verify(authorization)
    if (typeof decoded !== "string")
      return {
        id: decoded.payload?.id,
        email: decoded.payload?.email,
        type: decoded.payload?.type
      } as PayloadType

    return null
  } catch (error) {
    console.error(error)
    return null
  }
}
