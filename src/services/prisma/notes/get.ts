import { selectSchemaNote } from "@/schemas/prisma/notes"
import { prismaClient } from "../config"

export const getNote = async ({ id }: { id: number }) => {
  const result = await prismaClient.note.findFirst({
    where: {
      id
    },
    select: selectSchemaNote
  })

  return result
}
