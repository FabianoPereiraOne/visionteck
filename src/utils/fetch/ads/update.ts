import { PatchAdsProps } from "@/types/ads"

export const fetchUpdateAds = async ({
  id,
  description,
  link,
  title
}: PatchAdsProps) => {
  const result = await fetch(`/api/ads?id=${id}`, {
    method: "PATCH",
    body: JSON.stringify({ description, link, title })
  })

  return result
}
