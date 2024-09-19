import { FieldValues, UseFormRegister } from "react-hook-form"
import { FiLayers, FiPlus, FiRefreshCcw, FiUpload } from "react-icons/fi"
import styled from "../global/styles/index.module.scss"

export const layoutAddAds = ({
  register,
  preview
}: {
  register: UseFormRegister<FieldValues>
  preview: string
}) => {
  return {
    title: "Lista de Anúncios",
    subtitle: `Crie anúncios impressionantes para os usuários.`,
    buttonSubmit: (
      <>
        <FiPlus />
        Adicionar novo
      </>
    ),
    buttonUpdate: (
      <>
        <FiRefreshCcw />
        Atualizar anúncio
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
        maxLength={100}
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
      <div key='file' className={styled.containerUpload}>
        <label htmlFor='file'>
          <FiUpload /> Escolher imagem
        </label>
        <input
          id='file'
          {...register("file")}
          hidden
          type='file'
          accept='.png, .jpeg, .jpg, .webp'
        />

        {preview?.length > 0 && (
          <figure className={styled.containerPreview}>
            <img src={preview} alt='Preview' />
          </figure>
        )}
      </div>
    ]
  }
}
