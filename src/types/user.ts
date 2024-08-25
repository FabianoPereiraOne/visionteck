import { Role } from "@prisma/client"

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
  plan: object
  profession: string
  type: Role
  status: boolean
  createdAt: string
  updatedAt: string
  progress: {
    id: number
    class: string
    userId: string
    rating: number
    completed: boolean
    completedAt: string
    createdAt: string
    updatedAt: string
  }
  trains: {
    id: string
    title: string
    description: string
    linkCover: string
    collection: object
    createdAt: string
    updatedAt: string
    modules: []
    user: object
  }
  emailVerified: boolean
  verificationToken: string
}
