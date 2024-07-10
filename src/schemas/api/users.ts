import { z } from "zod"

export const userBodySchema = z.object({
  name: z.string().min(5, "Nome requer mínimo de 5 dígitos!"),
  email: z.string().email("Email não é válido!"),
  phone: z.number().min(6, "Telefone requer mínimo de 6 dígitos"),
  profession: z.string().min(4, "Profissão requer mínimo de 4 dígitos")
})
