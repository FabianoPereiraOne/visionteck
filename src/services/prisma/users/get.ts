import { selectSchema } from "@/schemas/prisma/users"
import { prismaClient } from "../config"

export const getUser = async ({
  id,
  email
}: {
  id?: string
  email?: string
}) => {
  const result = await prismaClient.user.findFirst({
    select: { ...selectSchema, password: true },
    where: {
      id,
      email
    }
  })

  return result
}
