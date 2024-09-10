import { sign } from "@/utils/jwt"
import { Role } from "@prisma/client"

export const useGenerateToken = async ({
  id,
  name,
  email,
  type
}: {
  id: string
  name: string
  email: string
  type: Role
}) => {
  const result = await sign({ id, name, email, type })
  return result
}
