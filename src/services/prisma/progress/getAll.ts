import { selectSchemaProgress } from "@/schemas/prisma/progress"
import { prismaClient } from "../config"

export const getAllProgress = async () => {
  const result = await prismaClient.progress.findMany({
    select: selectSchemaProgress
  })

  return result
}
