import { z } from "zod"

export const AdsSchema = z.object({
  title: z.string().min(1, "Titulo obrigatório."),
  description: z.string().min(1, "Descrição obrigatória."),
  link: z.string().min(1, "Link do anúncio obrigatório.")
})
