import { selectSchemaAds } from "@/schemas/prisma/ads"
import { prismaClient } from "../config"

export const deleteAds = async ({ id }: { id: string }) => {
  const result = await prismaClient.ad.delete({
    where: {
      id
    },
    select: selectSchemaAds
  })

  return result
}
