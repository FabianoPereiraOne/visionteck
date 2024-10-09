import { Available } from "@/types/available"
import { prismaClient } from "../config"

export const createAvailableTime = async ({
  date,
  endTime,
  startTime,
  isAvailable,
  userId
}: Available) => {
  const result = await prismaClient.availableTime.create({
    data: {
      date,
      endTime,
      startTime,
      isAvailable,
      user: {
        connect: {
          id: userId
        }
      }
    }
  })

  return result
}
