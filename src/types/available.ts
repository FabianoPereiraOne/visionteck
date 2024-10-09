export type Available = {
  date: Date
  endTime: string
  startTime: string
  isAvailable: boolean
  userId: string
}

export type listAvailable = {
  id: number
  userId: string | null
  date: Date
  startTime: string
  endTime: string
  isAvailable: boolean
  createdAt: Date
  updatedAt: Date
}[]
