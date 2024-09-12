export const fetchAllNotes = async () => {
  const result = await fetch("/api/notes", {
    method: "GET"
  })

  return result
}
