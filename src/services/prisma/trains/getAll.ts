import { selectSchemaTrain } from "@/schemas/prisma/trains"
import { prismaClient } from "../config"

export const getAllTrains = async () => {
  const result = await prismaClient.train.findMany({
    select: selectSchemaTrain
  })

  return result
}
