export const fetchAllCollections = async () => {
  const result = await fetch("/api/collections", {
    method: "GET"
  })

  return result
}
