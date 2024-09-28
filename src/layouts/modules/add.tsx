import { Train } from "@/types/train"
import { FieldValues, UseFormRegister } from "react-hook-form"
import { FiLayers, FiPlus, FiRefreshCcw } from "react-icons/fi"
import styled from "../global/styles/index.module.scss"

export const layoutAddModule = ({
  register,
  trains
}: {
  register: UseFormRegister<FieldValues>
  trains: Train[]
}) => {
  return {
    title: "Lista de módulos",
    subtitle: `Adicione um novo módulo.`,
    buttonSubmit: (
      <>
        <FiPlus />
        Adicionar novo
      </>
    ),
    buttonUpdate: (
      <>
        <FiRefreshCcw />
        Atualizar módulo
      </>
    ),
    listView: (
      <>
        <FiLayers /> Cadastrados
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
      <select key='trainId' {...register("trainId")} className={styled.select}>
        <option value=''>Selecione uma trilha</option>
        {trains?.map(train => {
          return (
            <option key={train?.id} value={train?.id}>
              {train?.title}
            </option>
          )
        })}
      </select>,
      <div className={styled.containerLock} key='groupLock'>
        <label className={styled.label}>
          <input
            id='lock'
            className={styled.checkbox}
            type='checkbox'
            {...register("lock")}
          />
          <p className={styled.paragraph}>Privado</p>
        </label>
        <input
          id='open'
          title='Data de liberação'
          className={styled.date}
          type='date'
          placeholder='Data de liberação'
          {...register("open")}
        />
      </div>
    ]
  }
}
