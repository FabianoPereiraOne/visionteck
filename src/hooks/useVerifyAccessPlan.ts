import { planAuthorized } from "@/schemas/others/config"

export const useVerifyAccessPlan = () => {
  const verifyAccess = (userPlan: number, trainPlan: number) => {
    return planAuthorized[userPlan].includes(trainPlan)
  }

  return { verifyAccess }
}
