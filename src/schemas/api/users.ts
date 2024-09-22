import { Role } from "@prisma/client"
import { z } from "zod"

export const userCreateSchema = z.object({
  name: z.string().min(5, "Nome obrigatório."),
  email: z.string().email("Email não é válido!"),
  phone: z.string().min(6, "Telefone obrigatório."),
  profession: z.string().min(4, "Profissão obrigatório."),
  password: z.string().min(8, "Senha obrigatória."),
  type: z.nativeEnum(Role).optional()
})

export const userSchema = z
  .object({
    name: z.string().min(5, "Nome obrigatório."),
    email: z.string().email("Email não é válido!"),
    phone: z.string().min(6, "Telefone obrigatório."),
    profession: z.string().min(4, "Profissão obrigatório."),
    password: z.string().min(8, "Senha obrigatória."),
    confirmPassword: z.string().min(8, "Confirmação de senha obrigatória."),
    type: z.nativeEnum(Role).optional()
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "As senhas devem ser iguais",
    path: ["confirmPassword"]
  })

export const schemaLogin = userCreateSchema.pick({
  email: true,
  password: true
})
