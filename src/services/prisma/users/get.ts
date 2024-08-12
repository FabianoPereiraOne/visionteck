import { selectSchemaUser } from "@/schemas/prisma/users"
import { prismaClient } from "../config"

export const getUser = async ({
  id,
  email
}: {
  id?: string
  email?: string
}) => {
  const result = await prismaClient.user.findFirst({
    select: { ...selectSchemaUser, password: true },
    where: {
      id,
      email
    }
  })

  return result
}
