import { ClassType } from "@prisma/client"

export type postClassProps = {
  title: string
  description: string
  linkClass: string
  type?: ClassType
  moduleId: string
}

export type patchClassProps = {
  id: string
  title?: string
  description?: string
  linkClass?: string
  type?: ClassType
  moduleId?: string
}
