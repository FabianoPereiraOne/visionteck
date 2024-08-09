import { selectSchemaTrain } from "@/schemas/prisma/trains"
import { prismaClient } from "../config"

export const getTrain = async ({ id }: { id: string }) => {
  const result = await prismaClient.train.findFirst({
    where: {
      id
    },
    select: selectSchemaTrain
  })

  return result
}
