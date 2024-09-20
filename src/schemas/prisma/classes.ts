import { selectSchemaProgress } from "./progress"

export const selectSchemaClass = {
  id: true,
  title: true,
  type: true,
  description: true,
  linkClass: true,
  moduleId: true,
  createdAt: true,
  updatedAt: true,
  progress: {
    select: selectSchemaProgress
  }
}
