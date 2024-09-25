import { prismaClient } from "../config"

export const getPlan = async ({ id }: { id: number }) => {
  const result = await prismaClient.plan.findFirst({
    where: {
      id
    }
  })

  return result
}
