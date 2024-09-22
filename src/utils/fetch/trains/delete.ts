"use server"
import serverAPI from "../config"

export const fetchDeleteTrain = async ({ id }: { id: string }) => {
  const { DeleteOn } = serverAPI()
  const result = DeleteOn({ route: "trains", id })
  return result
}
