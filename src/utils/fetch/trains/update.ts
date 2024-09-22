"use server"
import { patchTrainProps } from "@/types/train"
import serverAPI from "../config"

export const fetchUpdateTrain = async ({
  id,
  description,
  title,
  linkCover,
  collectionId
}: patchTrainProps) => {
  const { UpdateOn } = serverAPI()
  const result = UpdateOn({
    route: "trains",
    id,
    data: { id, description, title, linkCover, collectionId }
  })
  return result
}
