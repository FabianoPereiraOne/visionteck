import { patchCollectionProps } from "@/types/collection"

export const fetchUpdateCollection = async ({
  id,
  description,
  title,
  themeColor
}: patchCollectionProps) => {
  const result = await fetch(`/api/collections?id=${id}`, {
    method: "PATCH",
    body: JSON.stringify({ description, themeColor, title })
  })

  return result
}
