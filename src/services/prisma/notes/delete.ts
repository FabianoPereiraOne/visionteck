import { selectSchemaNote } from "@/schemas/prisma/notes"
import { prismaClient } from "../config"

export const deleteNote = async ({ id }: { id: number }) => {
  const result = await prismaClient.note.delete({
    where: {
      id
    },
    select: selectSchemaNote
  })

  return result
}
