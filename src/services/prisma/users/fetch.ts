import { prismaClient } from "../config"

export const fetchGetUserByID = async (id: string) => {
  const result = await prismaClient.user.findFirst({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      plan: true,
      profession: true,
      type: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      progress: true,
      trains: true,
      emailVerified: true,
      verificationToken: true
    },
    where: {
      id
    }
  })

  return result
}
