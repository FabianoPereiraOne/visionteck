import { selectSchemaAds } from "@/schemas/prisma/ads"
import { PatchAdsProps } from "@/types/ads"
import { prismaClient } from "../config"

export const updateAds = async ({
  id,
  title,
  description,
  link
}: PatchAdsProps) => {
  const result = await prismaClient.ad.update({
    where: {
      id
    },
    data: {
      title,
      description,
      link
    },
    select: selectSchemaAds
  })

  return result
}
