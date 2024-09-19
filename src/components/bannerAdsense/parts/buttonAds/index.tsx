"use client"
import ButtonAdmin from "@/components/buttonAdmin"
import useDisplayErrors from "@/hooks/useDisplayErrors"
import { layoutAddAds } from "@/layouts/ads/add"
import { adsSchema } from "@/schemas/api/ads"
import { PatchAdsProps, TypeAds } from "@/types/ads"
import { fetchDeleteAds } from "@/utils/fetch/ads/delete"
import { fetchAllAds } from "@/utils/fetch/ads/get"
import { fetchCreateAds } from "@/utils/fetch/ads/post"
import { fetchUpdateAds } from "@/utils/fetch/ads/update"
import { fetchUploadFile } from "@/utils/fetch/uploads/post"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

const ButtonAds = () => {
  const [update, setUpdate] = useState(false)
  const [preview, setPreview] = useState("")
  const { register, watch, getValues, reset, setValue } = useForm()
  const { displayErrors } = useDisplayErrors()

  const handlerSubmit = async () => {
    const dataValues = getValues()
    const files = dataValues?.file

    if (!files[0]) return toast.error("Nenhuma imagem selecionada.")

    try {
      const dataFile = new FormData()
      dataFile.set("file", files[0])

      const result = await fetchUploadFile({ data: dataFile })
      const response = await result.json()

      const { success, data, error } = await adsSchema.safeParse({
        ...dataValues,
        link: response?.path ?? ""
      })

      if (!success) {
        return displayErrors(error?.errors)
      }

      await fetchCreateAds({ data }).then(() => {
        toast.success("Anúncio criado com sucesso.")
        reset()
        setPreview("")
      })
    } catch (error) {
      toast.error("Erro ao fazer upload do arquivo.")
    }
  }

  const loadSubmitUpdate = async ({
    dataUpdate
  }: {
    dataUpdate: PatchAdsProps
  }) => {
    try {
      await fetchUpdateAds(dataUpdate).then(() => {
        toast.success("Anúncio atualizado com sucesso.")
        setUpdate(false)
        reset()
      })
    } catch (error) {
      console.error(error)
      toast.error("Erro ao atualizar anúncio.")
    }
  }

  const handlerUpdateAds = async () => {
    const dataUpdate = getValues()
    const id = dataUpdate?.id
    const files = dataUpdate?.file

    if (!id) return toast.error("Não foi possível atualizar anúncio.")

    if (files[0]) {
      const dataFile = new FormData()
      dataFile.set("file", files[0])

      const result = await fetchUploadFile({ data: dataFile })
      const response = await result.json()

      return loadSubmitUpdate({
        dataUpdate: { ...dataUpdate, link: response?.path }
      } as { dataUpdate: PatchAdsProps })
    }

    loadSubmitUpdate({ dataUpdate } as { dataUpdate: PatchAdsProps })
  }

  const loadSetValues = (ads: TypeAds) => {
    setValue("id", ads?.id)
    setValue("title", ads?.title)
    setValue("description", ads?.description)
    setValue("link", ads?.link)
    setPreview(ads?.link)
    setUpdate(true)
  }

  const handlerDeleteAds = async (ads: TypeAds) => {
    const id = ads?.id

    if (!id) return toast.error("Não foi possível deletar anúncio.")

    try {
      await fetchDeleteAds({ id }).then(() => {
        toast.success("Anúncio deletado com sucesso.")
      })
    } catch (error) {
      console.error(error)
      toast.error("Erro ao deletar anúncio.")
    }
  }

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

  return (
    <>
      <ButtonAdmin
        update={update}
        title='Anúncios'
        layout={layoutAddAds({ register, preview })}
        fcUpdate={handlerUpdateAds}
        fcSubmit={handlerSubmit}
        fcDelete={handlerDeleteAds}
        fcGetData={fetchAllAds}
        fcLoadSetValues={loadSetValues}
      />
    </>
  )
}

export default ButtonAds
