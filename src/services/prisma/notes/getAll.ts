import { selectSchemaNote } from "@/schemas/prisma/notes"
import { prismaClient } from "../config"

export const getAllNotes = async () => {
  const result = await prismaClient.note.findMany({
    select: selectSchemaNote
  })

  return result
}
