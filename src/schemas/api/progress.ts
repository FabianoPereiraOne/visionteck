import { z } from "zod"

export const progressSchema = z.object({
  classId: z.string().min(1, "ID da Aula obrigatório."),
  userId: z.string().min(1, "ID do usuário obrigatório."),
  rating: z.number().optional(),
  completed: z.boolean(),
  completedAt: z.string().refine(date => !isNaN(Date.parse(date)), {
    message: "Formato da data de concluído é inválido."
  })
})
