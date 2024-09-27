export const fetchChangeProgress = async ({
  completed,
  classId,
  userId,
  completedAt
}: {
  completed: boolean
  classId: string
  userId: string
  completedAt: string
}) => {
  const result = await fetch("/api/progress", {
    method: "POST",
    body: JSON.stringify({ completed, classId, userId, completedAt })
  })

  return result
}
