"use server"
import serverAPI from "../config"

export const fetchAllNotes = async () => {
  const { getAll } = serverAPI()
  const result = getAll({ route: "notes" })
  return result
}
