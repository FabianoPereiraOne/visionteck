import { selectSchemaCollection } from "@/schemas/prisma/collections"
import { prismaClient } from "../config"

export const getCollection = async ({ id }: { id: number }) => {
  const result = await prismaClient.collection.findFirst({
    where: {
      id
    },
    select: selectSchemaCollection
  })

  return result
}
