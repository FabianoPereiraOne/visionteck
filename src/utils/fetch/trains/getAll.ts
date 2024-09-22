"use server"
import serverAPI from "../config"

export const fetchAllTrains = async () => {
  const { getAll } = serverAPI()
  const result = getAll({ route: "trains" })
  return result
}
