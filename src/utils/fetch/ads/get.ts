export const fetchAllAds = async () => {
  const result = await fetch("/api/ads", {
    method: "GET"
  })

  return result
}
