import { selectSchemaClass } from "@/schemas/prisma/classes"
import { prismaClient } from "../config"

export const deleteClass = async ({ id }: { id: string }) => {
  const result = await prismaClient.class.delete({
    where: {
      id
    },
    select: selectSchemaClass
  })

  return result
}
