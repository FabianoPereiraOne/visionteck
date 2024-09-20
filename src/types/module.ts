import { Class } from "./class"

export type postModuleProps = {
  title: string
  description: string
  lock?: boolean
  open?: Date
  trainId: string
}

export type patchModuleProps = {
  id: string
  title?: string
  description?: string
  lock?: boolean
  open?: Date
  trainId?: string
}

export type Module = {
  id: string
  title: string
  description: string
  lock: boolean | null
  open: Date | null
  trainId: string | null
  createdAt: Date
  updatedAt: Date
  classes: Class[]
}
