import { Bullet } from "@prisma/client"
import { FieldValues, UseFormRegister } from "react-hook-form"
import { FiLayers, FiPlus, FiRefreshCcw } from "react-icons/fi"
import styled from "../global/styles/index.module.scss"
const Bullets = Object.values(Bullet)

export const layoutAddNote = ({
  register
}: {
  register: UseFormRegister<FieldValues>
}) => {
  return {
    title: "Notas de atualização",
    subtitle: `Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.`,
    buttonSubmit: (
      <>
        <FiPlus />
        Adicionar novo
      </>
    ),
    buttonUpdate: (
      <>
        <FiRefreshCcw />
        Atualizar nota
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
        data-tag='input'
        type='text'
        maxLength={50}
        placeholder='Titulo'
        {...register("title")}
      />,
      <textarea
        key='description'
        className={styled.textarea}
        id='description'
        data-tag='textarea'
        placeholder='Descrição'
        {...register("description")}
      />,

      <div className={styled.containerFlex} key='groupBullet'>
        <input
          key='bulletColor'
          id='bulletColor'
          className={styled.inputColor}
          data-tag='inputColor'
          type='color'
          placeholder='Cor'
          {...register("bulletColor")}
        />
        <select
          id='bullet'
          {...register("bullet")}
          key='bullet'
          className={styled.select}
        >
          {Bullets.map((bullet, index) => {
            return (
              <option key={`bullet-${index}`} value={bullet}>
                {bullet}
              </option>
            )
          })}
        </select>
      </div>
    ]
  }
}
