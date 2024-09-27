import { selectSchemaProgress } from "@/schemas/prisma/progress"
import { prismaClient } from "../config"

export const getProgressByParents = async ({
  userId,
  classId
}: {
  userId: string
  classId: string
}) => {
  const result = await prismaClient.progress.findFirst({
    where: {
      classId,
      userId
    },
    select: selectSchemaProgress
  })

  return result
}
