import { Role } from "@prisma/client"
import { z } from "zod"

export const userCreateSchema = z.object({
  name: z.string().min(5, "Nome requer mínimo de 5 dígitos!"),
  email: z.string().email("Email não é válido!"),
  phone: z.string().min(6, "Telefone requer mínimo de 6 dígitos"),
  profession: z.string().min(4, "Profissão requer mínimo de 4 dígitos"),
  password: z.string().min(8, "Senha requer mínimo de 8 dígitos"),
  type: z.nativeEnum(Role).optional()
})
