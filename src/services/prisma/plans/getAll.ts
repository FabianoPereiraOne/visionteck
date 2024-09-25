import { prismaClient } from "../config"

export const getAllPlans = async () => {
  const result = await prismaClient.plan.findMany()
  return result
}
