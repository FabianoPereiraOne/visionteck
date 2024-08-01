import { prismaClient } from "../config"

export const getAllUsers = async () => {
  const result = await prismaClient.user.findMany({
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
    }
  })

  return result
}
