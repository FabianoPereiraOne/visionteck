import { selectSchemaTrain } from "@/schemas/prisma/trains"
import { PostTrainProps } from "@/types/train"
import { prismaClient } from "../config"

export const createTrain = async ({
  id,
  title,
  description,
  linkCover,
  collectionId,
  planId
}: PostTrainProps) => {
  const result = await prismaClient.train.create({
    data: {
      id,
      title,
      description,
      linkCover,
      plan: {
        connect: {
          id: planId
        }
      },
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
