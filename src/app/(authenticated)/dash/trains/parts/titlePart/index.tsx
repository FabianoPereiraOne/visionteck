"use client"
import ButtonAdmin from "@/components/buttonAdmin"
import useDisplayErrors from "@/hooks/useDisplayErrors"
import { layoutAddCollection } from "@/layouts/collection/add"
import { collectionsSchema } from "@/schemas/api/collections"
import { fetchDeleteCollection } from "@/utils/fetch/collections/delete"
import { fetchClientAllCollections } from "@/utils/fetch/collections/getAllClient"
import { fetchCreateCollection } from "@/utils/fetch/collections/post"
import { fetchUpdateCollection } from "@/utils/fetch/collections/update"
import { Collection } from "@prisma/client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { FiPlus } from "react-icons/fi"
import styled from "./style.module.scss"

export const TitlePart = () => {
  const [update, setUpdate] = useState(false)
  const { register, getValues, reset, setValue } = useForm()
  const { displayErrors } = useDisplayErrors()

  const handlerSubmit = async () => {
    const dataCreate = getValues()

    const { success, data, error } = collectionsSchema.safeParse(dataCreate)

    if (!success) {
      return displayErrors(error?.errors)
    }

    try {
      await fetchCreateCollection({ data }).then(() => {
        toast.success("Coleção criada com sucesso.")
        reset()
      })
    } catch (error) {
      console.error(error)
      toast.error("Erro ao criar nova Coleção.")
    }
  }

  const handlerDelete = async (collection: Collection) => {
    const id = collection?.id

    if (!id) return toast.error("Ops! erro ao deletar coleção.")

    try {
      await fetchDeleteCollection({ id }).then(() => {
        reset()
        toast.success("Coleção deletada com sucesso.")
      })
    } catch (error) {
      console.error(error)
      toast.error("Ops! erro ao deletar coleção.")
    }
  }

  const handlerUpdate = async () => {
    const data = getValues()
    const id = data?.id

    if (!id) return toast.error("Não foi possível atualizar coleção.")

    try {
      await fetchUpdateCollection(data as Collection).then(() => {
        reset()
        setUpdate(false)
        toast.success("Coleção atualizada com sucesso.")
      })
    } catch (error) {
      console.error(error)
      toast.error("Ops! erro ao atualizar coleção.")
    }
  }

  const loadSetValues = (collection: Collection) => {
    setValue("id", collection?.id)
    setValue("title", collection?.title)
    setValue("description", collection?.description)
    setValue("themeColor", collection?.themeColor)
    setUpdate(true)
  }

  return (
    <article className={styled.container}>
      <strong className={styled.title}>Coleção de Trilhas</strong>
      <ButtonAdmin
        reset={reset}
        iconButton={<FiPlus />}
        layout={layoutAddCollection({ register })}
        update={update}
        variant='circle'
        fcUpdate={handlerUpdate}
        fcSubmit={handlerSubmit}
        fcDelete={handlerDelete}
        fcGetData={fetchClientAllCollections}
        fcLoadSetValues={loadSetValues}
      />
    </article>
  )
}
