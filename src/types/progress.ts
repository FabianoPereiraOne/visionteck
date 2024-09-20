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

export type Progress = {
  id: number
  classId: string
  userId: string
  rating: number | null
  completed: boolean
  completedAt: Date | null
  createdAt: Date
  updatedAt: Date
}
