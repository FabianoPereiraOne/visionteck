import { selectSchemaUser } from "@/schemas/prisma/users"
import { prismaClient } from "../config"

export const getAllUsers = async () => {
  const result = await prismaClient.user.findMany({
    select: selectSchemaUser
  })

  return result
}
