import { ClassType } from "@prisma/client"
import { Progress } from "./progress"

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

export type Class = {
  id: string
  title: string
  type: ClassType
  description: string
  linkClass: string
  moduleId: string | null
  createdAt: Date
  updatedAt: Date
  completed?: boolean
  progress: Progress[]
}
