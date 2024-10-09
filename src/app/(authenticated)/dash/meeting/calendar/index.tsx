"use client"
import Popup from "@/components/popup"
import { layoutAddSchedule } from "@/layouts/schedules/add"
import { useState } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { useForm } from "react-hook-form"
import styled from "./style.module.scss"

export const CalendarPart = () => {
  const [open, setOpen] = useState(false)
  const { register, setValue } = useForm()

  const schedules = [
    { id: "h-0", start: "09:00", end: "10:00", lock: false },
    { id: "h-1", start: "10:00", end: "11:00", lock: true },
    { id: "h-2", start: "11:00", end: "12:00", lock: false },
    { id: "h-3", start: "14:00", end: "15:00", lock: false },
    { id: "h-3", start: "16:00", end: "17:00", lock: false }
  ]

  const handlerSubmit = () => {}

  const handlerTogglePopup = () => {
    setOpen(!open)
  }

  return (
    <div className={styled.container}>
      <Calendar
        minDate={new Date()}
        {...(register("dateMeet"),
        {
          onChange: value => {
            setValue("dateMeet", value)
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
          layout={layoutAddSchedule({ register, schedules })}
          update={false}
        />
      )}
    </div>
  )
}
