import { ClassType } from "@prisma/client"
import { z } from "zod"

export const classesSchema = z.object({
  title: z.string().min(1, "Titulo obrigatório."),
  description: z.string().min(1, "Descrição obrigatória."),
  linkClass: z.string().min(1, "Link da aula obrigatório."),
  moduleId: z.string().min(1, "ID do Módulo obrigatório."),
  type: z.nativeEnum(ClassType).optional()
})
