import { selectSchemaClass } from "@/schemas/prisma/classes"
import { postClassProps } from "@/types/class"
import { prismaClient } from "../config"

export const createClass = async ({
  title,
  description,
  linkClass,
  type,
  moduleId
}: postClassProps) => {
  const result = await prismaClient.class.create({
    data: {
      title,
      description,
      linkClass,
      type,
      module: {
        connect: {
          id: moduleId
        }
      }
    },
    select: selectSchemaClass
  })

  return result
}
