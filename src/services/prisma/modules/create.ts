import { selectSchemaModule } from "@/schemas/prisma/modules"
import { postModuleProps } from "@/types/module"
import { prismaClient } from "../config"

export const createModule = async ({
  title,
  description,
  trainId,
  lock,
  open
}: postModuleProps) => {
  const result = await prismaClient.module.create({
    data: {
      title,
      description,
      lock,
      open,
      train: {
        connect: {
          id: trainId
        }
      }
    },
    select: selectSchemaModule
  })

  return result
}
