import { PostConsultation } from "@/types/consultation"
import { prismaClient } from "../config"

export const createConsultation = async ({
  userId,
  date,
  status,
  meetingLink,
  availableTimeId
}: PostConsultation) => {
  const result = await prismaClient.consultation.create({
    data: {
      user: {
        connect: {
          id: userId
        }
      },
      date,
      status,
      meetingLink,
      availableTime: {
        connect: {
          id: availableTimeId
        }
      }
    }
  })

  return result
}
