import { patchUserProps } from "@/types/user"
import { prismaClient } from "../config"

export const updateUser = async ({
  id,
  name,
  phone,
  profession,
  password,
  type,
  status,
  planID,
  emailVerified
}: patchUserProps) => {
  const plan = planID
    ? {
        connect: {
          id: planID
        }
      }
    : undefined

  const result = await prismaClient.user.update({
    where: {
      id
    },
    data: {
      name,
      phone,
      profession,
      password,
      type,
      status,
      plan,
      emailVerified
    },
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
