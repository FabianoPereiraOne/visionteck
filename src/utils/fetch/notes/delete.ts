"use server"
import serverAPI from "../config"

export const fetchDeleteNote = async ({ id }: { id: number }) => {
  const { DeleteOn } = serverAPI()
  const result = DeleteOn({ route: "notes", id })
  return result
}
