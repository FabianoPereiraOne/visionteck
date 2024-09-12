import { PostNoteProps } from "@/types/note"

export const fetchCreateNote = async (data: PostNoteProps) => {
  const result = await fetch("/api/notes", {
    method: "POST",
    body: JSON.stringify(data)
  })

  return result
}
