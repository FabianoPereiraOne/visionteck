import { selectSchemaUser } from "@/schemas/prisma/users"
import { postUserProps } from "@/types/user"
import { prismaClient } from "../config"

export const fetchCreateUser = async ({
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
    select: selectSchemaUser
  })

  return result
}
