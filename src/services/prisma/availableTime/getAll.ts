import { prismaClient } from "../config"

export const getAllAvailableTimes = async () => {
  const result = await prismaClient.availableTime.findMany()
  return result
}
