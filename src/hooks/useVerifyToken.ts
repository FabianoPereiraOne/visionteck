import { PayloadType } from "@/types/payload"
import { fetchUser } from "@/utils/fetch/users/get"

export const useVerifyToken = async (decodedToken: PayloadType | null) => {
  if (!decodedToken) return { status: false, data: null }

  try {
    const result = await fetchUser({ id: decodedToken?.id })

    if (!result) return { status: false, data: null }

    return { status: true, data: { ...result, password: "********" } }
  } catch (error) {
    console.error(error)
    return { status: false, data: null }
  }
}
