import { selectSchemaTrain } from "@/schemas/prisma/trains"
import { prismaClient } from "../config"

export const deleteTrains = async ({ id }: { id: string }) => {
  const result = await prismaClient.train.delete({
    where: {
      id
    },
    select: selectSchemaTrain
  })

  return result
}
