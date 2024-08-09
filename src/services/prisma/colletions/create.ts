import { selectSchemaCollection } from "@/schemas/prisma/collections"
import { postCollectionProps } from "@/types/collection"
import { prismaClient } from "../config"

export const createCollection = async ({
  title,
  description,
  themeColor
}: postCollectionProps) => {
  const result = await prismaClient.collection.create({
    data: {
      title,
      description,
      themeColor
    },
    select: selectSchemaCollection
  })

  return result
}
