import { z } from "zod"

export const trainsSchema = z.object({
  title: z.string().min(1, "Titulo obrigatório."),
  description: z.string().min(1, "Descrição obrigatória."),
  linkCover: z.string().min(1, "Imagem de capa obrigatória."),
  collectionId: z.number(),
  planId: z.number().optional(),
  lock: z.boolean().optional()
})
