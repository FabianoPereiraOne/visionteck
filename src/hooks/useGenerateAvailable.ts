import { workingHours } from "@/schemas/others/config"

const useGenerateAvailable = () => {
  const generateAvailable = () => {
    let dateNow = new Date()
    const numberDays = Array(30).fill(null)

    const listAvailableDays = numberDays.map(() => {
      dateNow.setDate(dateNow.getDate() + 1)

      const isDayWorker = dateNow.getDay() >= 1 && dateNow.getDay() <= 5

      if (!isDayWorker) return []

      const listAvailableTime = workingHours.map(({ start, end }) => {
        return {
          date: new Date(dateNow),
          startTime: start,
          endTime: end,
          isAvailable: true
        }
      })

      return listAvailableTime
    })

    return listAvailableDays
  }

  return { generateAvailable }
}

export default useGenerateAvailable
