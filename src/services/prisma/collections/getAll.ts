import { selectSchemaCollection } from "@/schemas/prisma/collections"
import { prismaClient } from "../config"

export const getAllColetions = async () => {
  const result = await prismaClient.collection.findMany({
    select: selectSchemaCollection,
    orderBy: {
      createdAt: "desc"
    }
  })

  return result
}
