import { Schedules } from "@/types/schedules"
import { FieldValues, UseFormRegister } from "react-hook-form"
import { FiLayers, FiPlus, FiRefreshCcw } from "react-icons/fi"
import styled from "../global/styles/index.module.scss"

export const layoutAddSchedule = ({
  register,
  schedules
}: {
  register: UseFormRegister<FieldValues>
  schedules: Schedules
}) => {
  return {
    title: "Agende uma consultoria",
    subtitle: `Escolha o horário da reunião.`,
    buttonSubmit: (
      <>
        <FiPlus />
        Agendar consultoria
      </>
    ),
    buttonUpdate: (
      <>
        <FiRefreshCcw />
        Atualizar consultoria
      </>
    ),
    listView: (
      <>
        <FiLayers /> Consultorias Realizadas
      </>
    ),
    inputs: [
      <select
        key='scheduleMeet'
        {...register("scheduleMeet")}
        className={styled.select}
      >
        <option value=''>Selecione um horário</option>
        {schedules?.map(schedule => {
          return (
            <option
              key={schedule?.id}
              value={schedule?.id}
              disabled={schedule?.lock}
            >
              {schedule?.start} até {schedule?.end}
            </option>
          )
        })}
      </select>
    ]
  }
}
