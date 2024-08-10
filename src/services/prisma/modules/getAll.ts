import { selectSchemaModule } from "@/schemas/prisma/modules"
import { prismaClient } from "../config"

export const getAllModules = async () => {
  const result = await prismaClient.module.findMany({
    select: selectSchemaModule
  })

  return result
}
