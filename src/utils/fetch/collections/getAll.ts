"use server"
import serverAPI from "../config"

export const fetchAllCollections = async () => {
  const { getAll } = serverAPI()
  const result = getAll({ route: "collections" })
  return result
}
