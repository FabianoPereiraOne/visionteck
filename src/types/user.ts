import { Role } from "@prisma/client"

export type postUserProps = {
  name: string
  email: string
  phone: string
  profession: string
  password: string
  verificationToken: string
}

export type patchUserProps = {
  id: string
  name?: string
  phone?: string
  profession?: string
  password?: string
  type?: Role
  status?: boolean
  planID?: number
  emailVerified?: boolean
}
