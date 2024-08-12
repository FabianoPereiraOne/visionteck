import { selectSchemaProgress } from "@/schemas/prisma/progress"
import { prismaClient } from "../config"

export const deleteProgress = async ({ id }: { id: number }) => {
  const result = await prismaClient.progress.delete({
    where: {
      id
    },
    select: selectSchemaProgress
  })

  return result
}
