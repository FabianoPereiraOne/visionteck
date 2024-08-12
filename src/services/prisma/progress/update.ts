import { selectSchemaProgress } from "@/schemas/prisma/progress"
import { PatchProgressProps } from "@/types/progress"
import { prismaClient } from "../config"

export const updateProgress = async ({
  id,
  classId,
  userId,
  rating,
  completed,
  completedAt
}: PatchProgressProps) => {
  const classSelect = classId
    ? {
        connect: {
          id: classId
        }
      }
    : undefined

  const user = userId
    ? {
        connect: {
          id: userId
        }
      }
    : undefined

  const result = await prismaClient.progress.update({
    where: {
      id
    },
    data: {
      class: classSelect,
      user,
      rating,
      completed,
      completedAt
    },
    select: selectSchemaProgress
  })

  return result
}
