import { Bullet } from "@prisma/client"
import { z } from "zod"

export const notesSchema = z.object({
  title: z.string().min(1, "Titulo obrigatório."),
  description: z.string().min(1, "Descrição obrigatória."),
  bullet: z.nativeEnum(Bullet).optional(),
  bulletColor: z.string().optional()
})
