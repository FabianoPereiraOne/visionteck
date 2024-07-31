import { fetchGetUserByID } from "@/services/prisma/users/fetch"
import { PayloadType } from "@/types/payload"

export const useVerifyToken = async (decodedToken: PayloadType | null) => {
  if (!decodedToken) return { status: false, data: null }

  try {
    const result = await fetchGetUserByID(decodedToken?.id)

    if (!result) return { status: false, data: null }

    return { status: true, data: result }
  } catch (error) {
    console.log(error)
    return { status: false, data: null }
  }
}
