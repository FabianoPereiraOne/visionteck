import { PostConsultation } from "@/types/consultation"
import { prismaClient } from "../config"

export const createConsultation = async ({
  userId,
  dateMeet,
  status,
  meetingLink,
  startTime,
  endTime
}: PostConsultation) => {
  const result = await prismaClient.consultation.create({
    data: {
      user: {
        connect: {
          id: userId
        }
      },
      dateMeet,
      status,
      meetingLink,
      startTime,
      endTime
    }
  })

  return result
}
