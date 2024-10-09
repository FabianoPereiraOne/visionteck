import { planAuthorizedType } from "@/types/plan"

export const cookieAuth = process.env.NEXT_PUBLIC_COOKIE_AUTHORIZED ?? ""
export const planAuthorized: planAuthorizedType = {
  0: [1],
  1: [1],
  2: [1, 2],
  3: [1, 2, 3]
}

export const workingHours = [
  { start: "09:00", end: "10:00" },
  { start: "10:00", end: "11:00" },
  { start: "11:00", end: "12:00" },
  { start: "13:00", end: "14:00" },
  { start: "14:00", end: "15:00" },
  { start: "15:00", end: "16:00" },
  { start: "16:00", end: "17:00" }
]
