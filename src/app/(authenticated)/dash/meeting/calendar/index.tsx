"use client"
import Popup from "@/components/popup"
import { layoutAddSchedule } from "@/layouts/schedules/add"
import { listAvailable } from "@/types/available"
import { useEffect, useState } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { useForm } from "react-hook-form"
import styled from "./style.module.scss"

export const CalendarPart = ({ list }: { list: listAvailable }) => {
  const [open, setOpen] = useState(false)
  const [listAvailable, setListAvailable] = useState<listAvailable>([])
  const { register, setValue, watch } = useForm()

  const handlerSubmit = () => {}

  const handlerTogglePopup = () => {
    setOpen(!open)
  }

  const watchDate = watch("date")

  const compareOnlyDates = (date1: Date, date2: Date) => {
    const dateOnly1 = new Date(
      date1?.getFullYear(),
      date1?.getMonth(),
      date1?.getDate()
    )
    const dateOnly2 = new Date(
      date2?.getFullYear(),
      date2?.getMonth(),
      date2?.getDate()
    )

    return dateOnly1.getTime() === dateOnly2.getTime()
  }

  useEffect(() => {
    const listFiltered = list.filter(time =>
      compareOnlyDates(time?.date, watchDate)
    )
    setListAvailable(listFiltered)
  }, [watchDate])

  const tileDisabled = ({ date }: { date: Date }) => {
    return !list.some(
      available =>
        date.getFullYear() === available.date?.getFullYear() &&
        date.getMonth() === available.date?.getMonth() &&
        date.getDate() === available.date?.getDate()
    )
  }

  return (
    <div className={styled.container}>
      <Calendar
        tileDisabled={tileDisabled}
        minDate={new Date()}
        {...(register("date"),
        {
          onChange: value => {
            setValue("date", value)
            setOpen(true)
          }
        })}
      />

      {open && (
        <Popup
          fcDel={() => {}}
          fcEdit={() => {}}
          data={[]}
          fcSubmit={handlerSubmit}
          fcToggle={handlerTogglePopup}
          layout={layoutAddSchedule({ register, list: listAvailable })}
          update={false}
        />
      )}
    </div>
  )
}
