import { z } from "zod"

export const signSchema = z.object({
  email: z.string().email("Email não é válido!"),
  password: z.string().min(8, "Senha requer mínimo de 8 dígitos")
})
