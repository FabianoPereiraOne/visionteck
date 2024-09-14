export const fetchDeleteAds = async ({ id }: { id: string }) => {
  const result = await fetch(`/api/ads?id=${id}`, {
    method: "DELETE"
  })

  return result
}
