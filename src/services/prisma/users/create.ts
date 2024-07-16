import { postUserProps } from "@/types/user"
import { prismaClient } from "../config"

export const createUser = async ({
  name,
  email,
  phone,
  password,
  profession,
  verificationToken
}: postUserProps) => {
  const result = await prismaClient.user.create({
    data: {
      name,
      email,
      phone,
      password,
      profession,
      verificationToken,
      plan: {
        connect: {
          id: 1
        }
      }
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      plan: true,
      profession: true,
      type: true,
      status: true
    }
  })

  return result
}
