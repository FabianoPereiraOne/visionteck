"use server"
import { PostNoteProps } from "@/types/note"
import serverAPI from "../config"

export const fetchCreateNote = async ({ data }: { data: PostNoteProps }) => {
  const { CreateOn } = serverAPI()
  const result = await CreateOn({ route: "notes", data })
  return result
}
