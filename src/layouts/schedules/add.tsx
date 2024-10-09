import { listAvailable } from "@/types/available"
import { FieldValues, UseFormRegister } from "react-hook-form"
import { FiLayers, FiPlus, FiRefreshCcw } from "react-icons/fi"
import styled from "../global/styles/index.module.scss"

export const layoutAddSchedule = ({
  register,
  list
}: {
  register: UseFormRegister<FieldValues>
  list: listAvailable
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
        {list?.map(schedule => {
          return (
            <option
              key={schedule?.id}
              value={schedule?.id}
              disabled={!schedule?.isAvailable}
            >
              {schedule?.startTime} até {schedule?.endTime}
            </option>
          )
        })}
      </select>
    ]
  }
}
