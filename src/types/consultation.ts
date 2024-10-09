import { Status } from "@prisma/client"

export type PostConsultation = {
  userId: string
  date: string
  status: Status
  meetingLink: string
  availableTimeId: number
}
