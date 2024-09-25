import { prismaClient } from "@/services/prisma/config"

export const fetchUser = async ({ id }: { id: string }) => {
  const result = await prismaClient.user.findFirst({
    where: {
      id
    }
  })

  return result
}
