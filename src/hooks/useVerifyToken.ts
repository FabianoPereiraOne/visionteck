import { fetchGetUserByID } from "@/services/prisma/users/fetch"
import { PayloadType } from "@/types/payload"

export const useVerifyToken = async (decodedToken: PayloadType | null) => {
  if (!decodedToken) return false

  try {
    const result = await fetchGetUserByID(decodedToken?.id)

    if (!result) return false

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
