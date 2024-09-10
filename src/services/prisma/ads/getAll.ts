import { selectSchemaAds } from "@/schemas/prisma/ads"
import { prismaClient } from "../config"

export const getAllAds = async () => {
  const result = await prismaClient.ad.findMany({
    select: selectSchemaAds
  })

  return result
}
