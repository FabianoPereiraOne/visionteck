"use server"
import { FieldValues } from "react-hook-form"
import serverAPI from "../config"

export const fetchUpdateNote = async ({
  id,
  data
}: {
  id: number
  data: FieldValues
}) => {
  const { UpdateOn } = serverAPI()
  const result = UpdateOn({ route: "notes", id, data })
  return result
}
