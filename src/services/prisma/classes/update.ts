import { selectSchemaClass } from "@/schemas/prisma/classes"
import { patchClassProps } from "@/types/class"
import { prismaClient } from "../config"

export const updateClass = async ({
  id,
  title,
  description,
  linkClass,
  type,
  moduleId
}: patchClassProps) => {
  const module = moduleId ? { connect: { id: moduleId } } : undefined

  const result = await prismaClient.class.update({
    where: {
      id
    },
    data: {
      title,
      description,
      linkClass,
      type,
      module
    },
    select: selectSchemaClass
  })

  return result
}
