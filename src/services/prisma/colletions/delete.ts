import { selectSchemaCollection } from "@/schemas/prisma/collections"
import { prismaClient } from "../config"

export const deleteCollection = async ({ id }: { id: number }) => {
  const result = await prismaClient.collection.delete({
    where: {
      id
    },
    select: selectSchemaCollection
  })

  return result
}
