import { selectSchema } from "@/schemas/prisma/users"
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
    select: selectSchema
  })

  return result
}
