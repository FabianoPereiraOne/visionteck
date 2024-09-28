import { Module } from "@/types/module"
import { ClassType } from "@prisma/client"
import { FieldValues, UseFormRegister } from "react-hook-form"
import { FiLayers, FiPlus, FiRefreshCcw } from "react-icons/fi"
import styled from "../global/styles/index.module.scss"

export const layoutAddClass = ({
  register,
  listModules
}: {
  register: UseFormRegister<FieldValues>
  listModules: Module[]
}) => {
  return {
    title: "Listagem de aula",
    subtitle: `Adicione uma nova aula.`,
    buttonSubmit: (
      <>
        <FiPlus />
        Adicionar nova
      </>
    ),
    buttonUpdate: (
      <>
        <FiRefreshCcw />
        Atualizar aula
      </>
    ),
    listView: (
      <>
        <FiLayers /> Cadastradas
      </>
    ),
    inputs: [
      <input
        key='title'
        id='title'
        className={styled.input}
        type='text'
        placeholder='Titulo'
        {...register("title")}
      />,
      <textarea
        key='description'
        className={styled.textarea}
        id='description'
        placeholder='Descrição'
        {...register("description")}
      />,
      <input
        key='linkClass'
        id='linkClass'
        className={styled.input}
        type='text'
        placeholder='Link da aula'
        {...register("linkClass")}
      />,
      <select
        key='moduleId'
        {...register("moduleId")}
        className={styled.select}
      >
        <option value=''>Selecione o módulo</option>
        {listModules?.map(module => {
          return (
            <option key={module?.id} value={module?.id}>
              {module.title}
            </option>
          )
        })}
      </select>,
      <select key='type' {...register("type")} className={styled.select}>
        <option value=''>Selecione o tipo</option>
        {Object.keys(ClassType)?.map((type, index) => {
          return (
            <option key={`type-${index}`} value={type}>
              {type}
            </option>
          )
        })}
      </select>
    ]
  }
}
