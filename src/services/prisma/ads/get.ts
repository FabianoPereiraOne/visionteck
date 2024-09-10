import { selectSchemaAds } from "@/schemas/prisma/ads"
import { prismaClient } from "../config"

export const getAds = async ({ id }: { id: string }) => {
  const result = await prismaClient.ad.findFirst({
    where: {
      id
    },
    select: selectSchemaAds
  })

  return result
}
