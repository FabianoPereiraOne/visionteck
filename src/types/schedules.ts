export type Schedules = schedule[]

type schedule = {
  id: string
  start: string
  end: string
  lock: boolean
}
