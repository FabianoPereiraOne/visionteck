import { postCollectionProps } from "@/types/collection"

export const fetchCreateCollection = async (data: postCollectionProps) => {
  const result = await fetch("/api/collections", {
    method: "POST",
    body: JSON.stringify(data)
  })

  return result
}
