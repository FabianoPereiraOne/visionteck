import { selectSchemaModule } from "@/schemas/prisma/modules"
import { prismaClient } from "../config"

export const getModule = async ({ id }: { id: string }) => {
  const result = await prismaClient.module.findFirst({
    where: {
      id
    },
    select: selectSchemaModule
  })

  return result
}
