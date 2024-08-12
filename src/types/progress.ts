export type PostProgressProps = {
  userId: string
  classId: string
  rating?: number
  completed: boolean
  completedAt: string | null
}

export type PatchProgressProps = {
  id: number
  userId?: string
  classId?: string
  rating?: number
  completed?: boolean
  completedAt?: string | null
}
