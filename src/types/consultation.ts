import { Status } from "@prisma/client"

export type PostConsultation = {
  userId: string
  dateMeet: string
  status: Status
  meetingLink: string
  startTime: string
  endTime: string
}
