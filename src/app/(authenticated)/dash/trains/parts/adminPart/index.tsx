"use client"
import ButtonAdmin from "@/components/buttonAdmin"
import useDisplayErrors from "@/hooks/useDisplayErrors"
import { useParseNumber } from "@/hooks/useParseNumber"
import { layoutAddTrains } from "@/layouts/trains/add"
import { trainsSchema } from "@/schemas/api/trains"
import { patchTrainProps, Train } from "@/types/train"
import { fetchDeleteTrain } from "@/utils/fetch/trains/delete"
import { fetchClientAllTrains } from "@/utils/fetch/trains/getAllClient"
import { fetchCreateTrain } from "@/utils/fetch/trains/post"
import { fetchUpdateTrain } from "@/utils/fetch/trains/update"
import { fetchUploadFile } from "@/utils/fetch/uploads/post"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

export const AdminPart = () => {
  const [update, setUpdate] = useState(false)
  const [preview, setPreview] = useState("")
  const { register, reset, watch, getValues, setValue } = useForm()
  const { displayErrors } = useDisplayErrors()

  const watchFile = watch("file")

  const loadControllerPreview = () => {
    const files = Array.from(watchFile)
    const file: any = files[0]

    if (!file) return

    const url = URL.createObjectURL(file)

    setPreview(url)
  }

  useEffect(() => {
    if (!watchFile) return

    loadControllerPreview()
  }, [watchFile])

  const resetAllValues = () => {
    setPreview("")
    setUpdate(false)
    reset()
  }

  const handlerSubmit = async () => {
    const dataValues = getValues()
    const dataCreate = {
      ...dataValues,
      collectionId: useParseNumber(dataValues?.collectionId),
      planId: useParseNumber(dataValues?.planId)
    }
    const files = dataValues?.file

    if (!files[0]) return toast.error("Nenhuma imagem selecionada.")

    try {
      const dataFile = new FormData()
      dataFile.set("file", files[0])

      const result = await fetchUploadFile({ data: dataFile })
      const response = await result.json()

      const { success, data, error } = await trainsSchema.safeParse({
        ...dataCreate,
        linkCover: response?.path ?? ""
      })

      if (!success) {
        return displayErrors(error?.errors)
      }

      await fetchCreateTrain({ data }).then(() => {
        resetAllValues()
        toast.success("Trilha criada com sucesso.")
      })
    } catch (error) {
      resetAllValues()
      toast.error("Ops! erro ao criar trilha.")
    }
  }

  const handlerDelete = async (train: Train) => {
    const id = train?.id

    if (!id) return toast.error("Ops! erro ao deletar trilha.")

    try {
      await fetchDeleteTrain({ id }).then(() => {
        resetAllValues()
        toast.success("Trilha deletada com sucesso.")
      })
    } catch (error) {
      resetAllValues()
      console.error(error)
      toast.error("Ops! erro ao deletar trilha.")
    }
  }

  const loadSubmitUpdate = async ({ data }: { data: patchTrainProps }) => {
    try {
      await fetchUpdateTrain({
        data
      }).then(() => {
        resetAllValues()
        toast.success("Trilha atualizado com sucesso.")
      })
    } catch (error) {
      resetAllValues()
      console.error(error)
      toast.error("Erro ao atualizar trilha.")
    }
  }

  const handlerUpdate = async () => {
    //Função nao ta atualizando planoID
    const dataUpdate = getValues()
    const id = dataUpdate?.id
    const files = dataUpdate?.file

    if (!id) return toast.error("Não foi possível atualizar trilha.")

    if (files[0]) {
      const dataFile = new FormData()
      dataFile.set("file", files[0])

      const result = await fetchUploadFile({ data: dataFile })
      const response = await result.json()
      delete dataUpdate?.file

      return loadSubmitUpdate({
        data: { ...dataUpdate, id, linkCover: response?.path ?? "" }
      })
    }

    loadSubmitUpdate({ data: { ...dataUpdate, id } })
  }

  const loadSetValues = (train: Train) => {
    setValue("id", train?.id)
    setValue("title", train?.title)
    setValue("description", train?.description)
    setValue("linkCover", train?.linkCover)
    setValue("collectionId", train?.collectionId ?? 1)
    setValue("planId", train?.planId ?? 1)
    setPreview(train?.linkCover)
    setUpdate(true)
  }

  return (
    <ButtonAdmin
      reset={resetAllValues}
      update={update}
      title='Trilhas'
      layout={layoutAddTrains({ register, preview })}
      fcUpdate={handlerUpdate}
      fcSubmit={handlerSubmit}
      fcDelete={handlerDelete}
      fcGetData={fetchClientAllTrains}
      fcLoadSetValues={loadSetValues}
    />
  )
}
