import { FieldValues, UseFormRegister } from "react-hook-form"
import { FiLayers, FiPlus, FiRefreshCcw } from "react-icons/fi"
import styled from "../global/styles/index.module.scss"

export const layoutAddCollection = ({
  register
}: {
  register: UseFormRegister<FieldValues>
}) => {
  return {
    title: "Coleção de trilhas",
    subtitle: `Adicione uma nova coleção.`,
    buttonSubmit: (
      <>
        <FiPlus />
        Adicionar nova
      </>
    ),
    buttonUpdate: (
      <>
        <FiRefreshCcw />
        Atualizar coleção
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
        maxLength={50}
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

      <div className={styled.containerFlex} key='groupBullet'>
        <input
          key='themeColor'
          id='themeColor'
          className={styled.inputColor}
          type='color'
          placeholder='Cor'
          {...register("themeColor")}
        />
      </div>
    ]
  }
}
