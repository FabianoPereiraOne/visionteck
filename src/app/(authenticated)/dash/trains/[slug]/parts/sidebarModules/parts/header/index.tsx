import ButtonAdmin from "@/components/buttonAdmin"
import { useVisionContext } from "@/context"
import useDisplayErrors from "@/hooks/useDisplayErrors"
import { layoutAddModule } from "@/layouts/modules/add"
import { modulesSchema } from "@/schemas/api/modules"
import { Module, patchModuleProps } from "@/types/module"
import { Train } from "@/types/train"
import { fetchCreateModule } from "@/utils/fetch/modules/create"
import { fetchDeleteModule } from "@/utils/fetch/modules/delete"
import { fetchUpdateModule } from "@/utils/fetch/modules/update"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { FiPlus } from "react-icons/fi"
import styled from "./style.module.scss"

export const Header = ({
  fcReload
}: {
  fcReload: (localTrain?: Train) => Promise<void | NodeJS.Timeout>
}) => {
  const [update, setUpdate] = useState(false)
  const { trains, modules } = useVisionContext()
  const { reset, register, getValues, setValue } = useForm()
  const { displayErrors } = useDisplayErrors()

  const resetAllValues = () => {
    setUpdate(false)
    reset()
    fcReload()
  }

  const handlerUpdate = async () => {
    const data = getValues()
    const id = data?.id

    if (!id) return toast.error("Não foi possível atualizar módulo.")

    try {
      await fetchUpdateModule(data as patchModuleProps).then(() => {
        toast.success("Módulo atualizado com sucesso.")
        resetAllValues()
      })
    } catch (error) {
      console.error(error)
      toast.error("Ops! erro ao atualizar módulo.")
    }
  }

  const handlerSubmit = async () => {
    const dataCreate = getValues()

    const { success, data, error } = modulesSchema.safeParse(dataCreate)

    if (!success) {
      console.log(dataCreate)
      return displayErrors(error?.errors)
    }

    try {
      await fetchCreateModule({ data }).then(() => {
        toast.success("Módulo criado com sucesso.")
        resetAllValues()
      })
    } catch (error) {
      console.error(error)
      toast.error("Erro ao criar novo Módulo.")
    }
  }

  const handlerDelete = async (module: Module) => {
    const id = module?.id

    if (!id) return toast.error("Ops! erro ao deletar módulo.")

    try {
      await fetchDeleteModule({ id }).then(() => {
        toast.success("Módulo deletado com sucesso.")
        resetAllValues()
      })
    } catch (error) {
      console.error(error)
      toast.error("Ops! erro ao deletar módulo.")
    }
  }

  const loadSetValues = (train: Module) => {
    setValue("id", train?.id)
    setValue("title", train?.title)
    setValue("description", train?.description)
    setValue("lock", train?.lock)
    setValue("open", train?.open)
    setValue("trainId", train?.trainId)
    setUpdate(true)
  }

  return (
    <article className={styled.container}>
      <strong className={styled.title}>Módulos</strong>
      <ButtonAdmin
        reset={reset}
        iconButton={<FiPlus />}
        layout={layoutAddModule({ register, trains })}
        update={update}
        variant='circle'
        fcUpdate={handlerUpdate}
        fcSubmit={handlerSubmit}
        fcDelete={handlerDelete}
        data={modules}
        fcLoadSetValues={loadSetValues}
      />
    </article>
  )
}
