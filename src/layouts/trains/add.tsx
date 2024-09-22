"use client"
import { Collection } from "@/types/collection"
import { fetchClientAllCollections } from "@/utils/fetch/collections/getAllClient"
import { useEffect, useState } from "react"
import { FieldValues, UseFormRegister } from "react-hook-form"
import { FiLayers, FiPlus, FiRefreshCcw, FiUpload } from "react-icons/fi"
import styled from "../global/styles/index.module.scss"

export const layoutAddTrains = ({
  register,
  preview
}: {
  register: UseFormRegister<FieldValues>
  preview: string
}) => {
  const [collections, setCollections] = useState<Collection[]>([])

  const loadDataCollections = async () => {
    const result = await fetchClientAllCollections()
    const response = await result.json()
    setCollections(response?.data ?? [])
  }

  useEffect(() => {
    loadDataCollections()
  }, [])

  return {
    title: "Trilhas de conhecimento",
    subtitle: `Adicione uma nova trilha.`,
    buttonSubmit: (
      <>
        <FiPlus />
        Adicionar nova
      </>
    ),
    buttonUpdate: (
      <>
        <FiRefreshCcw />
        Atualizar trilha
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
      <select
        key='collectionId'
        {...register("collectionId")}
        className={styled.select}
      >
        <option value={0}>Selecione uma coleção</option>
        {collections?.map(collection => {
          return (
            <option key={collection?.id} value={collection?.id}>
              {collection?.title}
            </option>
          )
        })}
      </select>,

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
