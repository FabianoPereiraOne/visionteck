import { sign } from "@/utils/jwt"
import { Role } from "@prisma/client"

export const useGenerateToken = async ({
  id,
  name,
  email,
  type,
  planId
}: {
  id: string
  name: string
  email: string
  type: Role
  planId: Number
}) => {
  const result = await sign({ id, name, email, type, planId })
  return result
}
