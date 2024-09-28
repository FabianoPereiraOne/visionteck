import { z } from "zod"

export const modulesSchema = z.object({
  title: z.string().min(1, "Titulo obrigatório."),
  description: z.string().min(1, "Descrição obrigatória."),
  trainId: z.string().min(1, "Trilha obrigatória."),
  lock: z.boolean().optional(),
  open: z.string().optional()
})
