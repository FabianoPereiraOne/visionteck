"use server"
import { PostTrainProps } from "@/types/train"
import serverAPI from "../config"

export const fetchCreateTrain = async ({ data }: { data: PostTrainProps }) => {
  const { CreateOn } = serverAPI()
  const result = CreateOn({ route: "trains", data })
  return result
}
