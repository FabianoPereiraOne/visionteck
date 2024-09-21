"use server"
import { patchCollectionProps } from "@/types/collection"
import serverAPI from "../config"

export const fetchUpdateCollection = async ({
  id,
  description,
  title,
  themeColor
}: patchCollectionProps) => {
  const { UpdateOn } = serverAPI()
  const result = UpdateOn({
    route: "collections",
    id,
    data: { id, description, title, themeColor }
  })
  return result
}
