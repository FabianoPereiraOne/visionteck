import { sign } from "@/utils/jwt"
import { Role } from "@prisma/client"

export const useGenerateToken = async ({
  id,
  email,
  type
}: {
  id: string
  email: string
  type: Role
}) => {
  const result = await sign({ id, email, type })
  return result
}
