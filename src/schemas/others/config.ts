import { planAuthorizedType } from "@/types/plan"

export const cookieAuth = process.env.NEXT_PUBLIC_COOKIE_AUTHORIZED ?? ""
export const planAuthorized: planAuthorizedType = {
  0: [1],
  1: [1],
  2: [1, 2],
  3: [1, 2, 3]
}
