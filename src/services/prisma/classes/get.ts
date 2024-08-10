import { selectSchemaClass } from "@/schemas/prisma/classes"
import { prismaClient } from "../config"

export const getClass = async ({ id }: { id: string }) => {
  const result = await prismaClient.class.findFirst({
    where: {
      id
    },
    select: selectSchemaClass
  })

  return result
}
