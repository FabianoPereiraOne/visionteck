"use client"
import { fetchCreateAvailableTime } from "@/utils/fetch/availableTime/post"
import toast from "react-hot-toast"
import { FiCalendar } from "react-icons/fi"
import styled from "./style.module.scss"

export const TitlePart = ({ isAdmin }: { isAdmin: boolean }) => {
  const handlerGenerateAvailable = async () => {
    try {
      await fetchCreateAvailableTime().then(() =>
        toast.success("Horários gerados com sucesso.")
      )
    } catch (error) {
      console.error(error)
      toast.error("Não foi possível gerar horários.")
    }
  }

  return (
    <div className={styled.container}>
      <h2 className={styled.title}>Configurações</h2>
      <h4 className={styled.subtitle}>
        Aqui você pode consultar e ajustar as informações da sua conta de forma
        simples e rápida. Personalize sua experiência ao atualizar dados.
      </h4>
      {isAdmin && (
        <button
          className={styled.buttonGenerate}
          onClick={handlerGenerateAvailable}
        >
          <FiCalendar />
          Gerar Disponibilidade
        </button>
      )}
    </div>
  )
}
