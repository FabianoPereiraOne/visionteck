import { selectSchemaClass } from "./classes"

export const selectSchemaModule = {
  id: true,
  title: true,
  description: true,
  lock: true,
  open: true,
  trainId: true,
  createdAt: true,
  updatedAt: true,
  classes: {
    select: selectSchemaClass
  }
}
