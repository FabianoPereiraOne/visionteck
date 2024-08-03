import { selectSchema } from "@/schemas/prisma/collections"
import { patchCollectionProps } from "@/types/collection"
import { prismaClient } from "../config"

export const updateCollection = async ({
  id,
  title,
  description,
  themeColor
}: patchCollectionProps) => {
  const result = await prismaClient.collection.update({
    data: {
      title,
      description,
      themeColor
    },
    where: {
      id
    },
    select: selectSchema
  })

  return result
}
