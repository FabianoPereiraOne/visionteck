import { selectSchemaModule } from "./modules"

export const selectSchemaTrain = {
  id: true,
  title: true,
  description: true,
  linkCover: true,
  collectionId: true,
  createdAt: true,
  updatedAt: true,
  plan: true,
  lock: true,
  modules: {
    select: selectSchemaModule
  }
}
