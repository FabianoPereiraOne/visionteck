import { selectSchemaModule } from "@/schemas/prisma/modules"
import { prismaClient } from "../config"

export const deleteModule = async ({ id }: { id: string }) => {
  const result = await prismaClient.module.delete({
    where: {
      id
    },
    select: selectSchemaModule
  })

  return result
}
