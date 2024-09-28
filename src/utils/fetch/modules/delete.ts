export const fetchDeleteModule = async ({ id }: { id: string }) => {
  const result = await fetch(`/api/modules?id=${id}`, {
    method: "DELETE"
  })

  return result
}
