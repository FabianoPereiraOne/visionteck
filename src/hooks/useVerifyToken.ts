import { fetchUser } from "@/services/prisma/users/fetch"
import { PayloadType } from "@/types/payload"

export const useVerifyToken = async (decodedToken: PayloadType | null) => {
  if (!decodedToken) return { status: false, data: null }

  try {
    const result = await fetchUser({ id: decodedToken?.id })

    if (!result) return { status: false, data: null }

    return { status: true, data: { ...result, password: "********" } }
  } catch (error) {
    console.log(error)
    return { status: false, data: null }
  }
}
