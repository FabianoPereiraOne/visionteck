import { z } from "zod"

export const modulesSchema = z.object({
  title: z.string().min(1, "Titulo obrigatório."),
  description: z.string().min(1, "Descrição obrigatória."),
  trainId: z.string().min(1, "ID da Trilha obrigatória."),
  lock: z.boolean().optional(),
  open: z
    .string()
    .refine(date => !isNaN(Date.parse(date)) || typeof date === "boolean", {
      message: "Formato da data de abertura inválida."
    })
    .optional()
})
