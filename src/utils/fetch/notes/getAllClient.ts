export const fetchClientAllNotes = async () => {
  const result = await fetch(`/api/notes`, {
    method: "GET"
  })

  return result
}
