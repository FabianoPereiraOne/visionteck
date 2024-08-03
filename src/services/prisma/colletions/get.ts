import { prismaClient } from "../config"

export const getCollection = async ({ id }: { id: number }) => {
  const result = await prismaClient.collection.findFirst({
    where: {
      id
    }
  })

  return result
}
