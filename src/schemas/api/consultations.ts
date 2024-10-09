import { Status } from "@prisma/client"
import { z } from "zod"

export const consultationsSchema = z.object({
  userId: z.string().min(1, "Usuário é obrigatório"),
  date: z.string().refine(date => !isNaN(Date.parse(date)), {
    message: "Formato da data de agendamento é inválido."
  }),
  status: z.nativeEnum(Status),
  meetingLink: z.string().min(1, "Link da reunião obrigatório."),
  availableTimeId: z.string().min(1, "Horário de inicio obrigatório.")
})
