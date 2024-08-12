import { selectSchemaNote } from "@/schemas/prisma/notes"
import { PostNoteProps } from "@/types/note"
import { prismaClient } from "../config"

export const createNote = async ({
  title,
  description,
  bullet,
  bulletColor
}: PostNoteProps) => {
  const result = await prismaClient.note.create({
    data: {
      title,
      description,
      bullet,
      bulletColor
    },
    select: selectSchemaNote
  })

  return result
}
