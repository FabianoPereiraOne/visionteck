import { selectSchemaTrain } from "@/schemas/prisma/trains"
import { PostTrainProps } from "@/types/train"
import { prismaClient } from "../config"

export const createTrain = async ({
  title,
  description,
  linkCover,
  collectionId,
  lock,
  planId
}: PostTrainProps) => {
  const plan = planId
    ? {
        connect: {
          id: planId
        }
      }
    : undefined

  const result = await prismaClient.train.create({
    data: {
      title,
      description,
      linkCover,
      lock,
      plan,
      collection: {
        connect: {
          id: collectionId
        }
      }
    },
    select: selectSchemaTrain
  })

  return result
}
