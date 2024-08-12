import { selectSchemaNote } from "@/schemas/prisma/notes"
import { PatchNoteProps } from "@/types/note"
import { prismaClient } from "../config"

export const updateNote = async ({
  id,
  title,
  description,
  bullet,
  bulletColor
}: PatchNoteProps) => {
  const result = await prismaClient.note.update({
    where: {
      id
    },
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
