import { z } from "zod"

export const collectionsSchema = z.object({
  title: z.string().min(1, "Titulo obrigatório."),
  description: z.string().min(1, "Descrição obrigatória."),
  themeColor: z.string().min(1, "Cor tema obrigatório.")
})
