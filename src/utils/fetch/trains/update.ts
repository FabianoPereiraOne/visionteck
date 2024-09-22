"use server"
import { patchTrainProps } from "@/types/train"
import serverAPI from "../config"

export const fetchUpdateTrain = async ({ data }: { data: patchTrainProps }) => {
  const { UpdateOn } = serverAPI()
  const result = UpdateOn({ route: "trains", id: `${data?.id}`, data })
  return result
}
