import { prismaClient } from "../config"

export const getAllColetions = async () => {
  const result = await prismaClient.coletion.findMany()

  return result
}
