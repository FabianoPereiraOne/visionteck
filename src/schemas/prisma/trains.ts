import { selectSchemaUser } from "./users"

export const selectSchemaTrain = {
  id: true,
  title: true,
  description: true,
  linkCover: true,
  collection: true,
  createdAt: true,
  updatedAt: true,
  modules: true,
  users: {
    select: selectSchemaUser
  }
}
