import { Status } from "@prisma/client"
import { z } from "zod"

export const consultationsSchema = z.object({
  userId: z.string().min(1, "Usuário é obrigatório"),
  dateMeet: z.string().refine(date => !isNaN(Date.parse(date)), {
    message: "Formato da data de agendamento é inválido."
  }),
  status: z.nativeEnum(Status),
  meetingLink: z.string().min(1, "Link da reunião obrigatório."),
  startTime: z.string().min(1, "Horário de inicio obrigatório."),
  endTime: z.string().min(1, "Horário de fim obrigatório.")
})
