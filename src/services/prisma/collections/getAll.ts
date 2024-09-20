import { selectSchemaCollection } from "@/schemas/prisma/collections"
import { prismaClient } from "../config"

export const getAllCollections = async () => {
  const result = await prismaClient.collection.findMany({
    select: selectSchemaCollection,
    orderBy: {
      createdAt: "desc"
    }
  })

  return result
}
