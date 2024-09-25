import { selectSchemaTrain } from "@/schemas/prisma/trains"
import { patchTrainProps } from "@/types/train"
import { prismaClient } from "../config"

export const updateTrain = async ({
  id,
  title,
  description,
  linkCover,
  collectionId,
  planId
}: patchTrainProps) => {
  const collection = collectionId
    ? {
        connect: {
          id: collectionId
        }
      }
    : undefined

  const plan = planId
    ? {
        connect: {
          id: planId
        }
      }
    : undefined

  const result = await prismaClient.train.update({
    where: {
      id
    },
    data: {
      title,
      description,
      linkCover,
      collection,
      plan
    },
    select: selectSchemaTrain
  })

  return result
}
