import { selectSchemaUser } from "@/schemas/prisma/users"
import { postUserProps } from "@/types/user"
import { prismaClient } from "../config"

export const createUser = async ({
  name,
  email,
  phone,
  type,
  password,
  profession,
  verificationToken
}: postUserProps) => {
  const result = await prismaClient.user.create({
    data: {
      name,
      email,
      phone,
      type,
      password,
      profession,
      verificationToken,
      plan: {
        connect: {
          id: 1
        }
      }
    },
    select: selectSchemaUser
  })

  return result
}
