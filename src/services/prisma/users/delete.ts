import { selectSchemaUser } from "@/schemas/prisma/users"
import { prismaClient } from "../config"

export const deleteUser = async ({ id }: { id: string }) => {
  const result = await prismaClient.user.delete({
    where: {
      id
    },
    select: selectSchemaUser
  })

  return result
}
