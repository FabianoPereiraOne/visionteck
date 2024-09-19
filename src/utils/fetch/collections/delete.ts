export const fetchDeleteCollection = async ({ id }: { id: number }) => {
  const result = await fetch(`/api/collections?id=${id}`, {
    method: "DELETE"
  })

  return result
}
