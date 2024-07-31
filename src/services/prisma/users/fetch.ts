import { prismaClient } from "../config"

export const fetchUser = async ({
  id,
  email
}: {
  id?: string
  email?: string
}) => {
  const result = await prismaClient.user.findFirst({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      plan: true,
      profession: true,
      password: true,
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
      id,
      email
    }
  })

  return result
}
