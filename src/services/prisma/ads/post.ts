import { selectSchemaAds } from "@/schemas/prisma/ads"
import { PostAdsProps } from "@/types/ads"
import { prismaClient } from "../config"

export const createAds = async ({ title, description, link }: PostAdsProps) => {
  const result = await prismaClient.ad.create({
    data: {
      title,
      description,
      link
    },
    select: selectSchemaAds
  })

  return result
}
