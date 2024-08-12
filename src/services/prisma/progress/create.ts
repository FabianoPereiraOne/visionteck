import { selectSchemaProgress } from "@/schemas/prisma/progress"
import { PostProgressProps } from "@/types/progress"
import { prismaClient } from "../config"

export const createProgress = async ({
  userId,
  classId,
  rating,
  completed,
  completedAt
}: PostProgressProps) => {
  const result = await prismaClient.progress.create({
    data: {
      class: {
        connect: {
          id: classId
        }
      },
      user: {
        connect: {
          id: userId
        }
      },
      rating,
      completed,
      completedAt
    },
    select: selectSchemaProgress
  })

  return result
}
