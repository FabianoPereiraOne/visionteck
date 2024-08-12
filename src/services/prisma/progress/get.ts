import { selectSchemaProgress } from "@/schemas/prisma/progress"
import { prismaClient } from "../config"

export const getProgress = async ({ id }: { id: number }) => {
  const result = await prismaClient.progress.findFirst({
    where: {
      id
    },
    select: selectSchemaProgress
  })

  return result
}
