"use server"
import serverAPI from "../config"

export const fetchDeleteCollection = async ({ id }: { id: number }) => {
  const { DeleteOn } = serverAPI()
  const result = DeleteOn({ route: "collections", id })
  return result
}
