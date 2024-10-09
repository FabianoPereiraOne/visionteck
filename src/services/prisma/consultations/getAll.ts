import { prismaClient } from "../config"

export const getAllConsultations = async () => {
  const result = await prismaClient.consultation.findMany()
  return result
}
