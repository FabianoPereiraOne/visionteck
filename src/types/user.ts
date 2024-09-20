import { Role } from "@prisma/client"
import { Progress } from "./progress"

export type UserProps = {
  name: string
  email: string
  phone: string
  profession: string
}

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

export type dataUser = {
  id: string
  name: string
  email: string
  phone: string
  plan: {
    id: number | null
    title: string
    description: string
    price: number
  }
  profession: string
  type: Role
  status: boolean
  createdAt: Date
  updatedAt: Date
  progress: Progress
  emailVerified: boolean
  verificationToken: string
}
