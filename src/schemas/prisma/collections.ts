import { selectSchemaTrain } from "./trains"

export const selectSchemaCollection = {
  id: true,
  title: true,
  description: true,
  themeColor: true,
  createdAt: true,
  updatedAt: true,
  trains: {
    select: selectSchemaTrain
  }
}
