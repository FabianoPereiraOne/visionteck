import { PostAdsProps } from "@/types/ads"

export const fetchCreateAds = async ({ data }: { data: PostAdsProps }) => {
  const result = await fetch("/api/ads", {
    method: "POST",
    body: JSON.stringify(data)
  })

  return result
}
