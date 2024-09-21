"use server"
import { postCollectionProps } from "@/types/collection"
import serverAPI from "../config"

export const fetchCreateCollection = async ({
  data
}: {
  data: postCollectionProps
}) => {
  const { CreateOn } = serverAPI()
  const result = CreateOn({ route: "collections", data })
  return result
}
