import { selectSchemaTrain } from "@/schemas/prisma/trains"
import { patchTrainProps } from "@/types/train"
import { prismaClient } from "../config"

export const updateTrain = async ({
  id,
  title,
  description,
  linkCover,
  collectionId
}: patchTrainProps) => {
  const collection = collectionId
    ? {
        connect: {
          id: collectionId
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
      collection
    },
    select: selectSchemaTrain
  })

  return result
}
