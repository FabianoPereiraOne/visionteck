import { selectSchemaClass } from "@/schemas/prisma/classes"
import { prismaClient } from "../config"

export const getAllClasses = async () => {
  const result = await prismaClient.class.findMany({
    select: selectSchemaClass
  })

  return result
}
