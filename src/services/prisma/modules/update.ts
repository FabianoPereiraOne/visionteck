import { selectSchemaModule } from "@/schemas/prisma/modules"
import { patchModuleProps } from "@/types/module"
import { prismaClient } from "../config"

export const updateModule = async ({
  id,
  title,
  description,
  lock,
  open,
  trainId
}: patchModuleProps) => {
  const train = trainId
    ? {
        connect: {
          id: trainId
        }
      }
    : undefined

  const result = await prismaClient.module.update({
    where: {
      id
    },
    data: {
      title,
      description,
      lock,
      open,
      train
    },
    select: selectSchemaModule
  })

  return result
}
