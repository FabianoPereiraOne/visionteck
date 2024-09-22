"use client"
import ButtonAdmin from "@/components/buttonAdmin"
import useDisplayErrors from "@/hooks/useDisplayErrors"
import { layoutAddNote } from "@/layouts/note/add"
import { notesSchema } from "@/schemas/api/notes"
import { NoteProps } from "@/types/note"
import { fetchDeleteNote } from "@/utils/fetch/notes/delete"
import { fetchClientAllNotes } from "@/utils/fetch/notes/getAllClient"
import { fetchCreateNote } from "@/utils/fetch/notes/post"
import { fetchUpdateNote } from "@/utils/fetch/notes/update"
import { memo, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { FiPlus } from "react-icons/fi"

const ButtonAdd = () => {
  const [update, setUpdate] = useState(false)
  const { register, reset, getValues, setValue } = useForm()
  const { displayErrors } = useDisplayErrors()

  const resetAllValues = () => {
    setUpdate(false)
    reset()
  }

  const handlerSubmit = async () => {
    const dataCreate = getValues()

    const { success, data, error } = notesSchema.safeParse(dataCreate)

    if (!success) {
      return displayErrors(error?.errors)
    }

    try {
      await fetchCreateNote({ data }).then(() => {
        resetAllValues()
        toast.success("Nota Criada com sucesso.")
      })
    } catch (error) {
      console.error(error)
      toast.error("Erro ao criar nova nota.")
    }
  }

  const handlerDelete = async (note: NoteProps) => {
    const id = note?.id

    if (!id) return toast.error("Não foi possível deletar nota.")

    try {
      await fetchDeleteNote({ id }).then(() => {
        resetAllValues()
        toast.success("Nota deletada com sucesso.")
      })
    } catch (error) {
      console.error(error)
      toast.error("Erro ao deletar nota.")
    }
  }

  const loadSetValues = (note: NoteProps) => {
    setValue("id", note?.id)
    setValue("title", note?.title)
    setValue("description", note?.description)
    setValue("bullet", note?.bullet)
    setValue("bulletColor", note?.bulletColor)
    setUpdate(true)
  }

  const handlerUpdate = async () => {
    const note = getValues()
    const id = note?.id

    if (!id) return toast.error("Não foi possível atualizar nota.")

    try {
      await fetchUpdateNote({ id, data: note }).then(() => {
        resetAllValues()
        toast.success("Nota atualizada com sucesso.")
      })
    } catch (error) {
      console.error(error)
      toast.error("Erro ao atualizar nota.")
    }
  }

  return (
    <>
      <ButtonAdmin
        reset={reset}
        update={update}
        variant='circle'
        iconButton={<FiPlus />}
        layout={layoutAddNote({ register })}
        fcUpdate={handlerUpdate}
        fcSubmit={handlerSubmit}
        fcDelete={handlerDelete}
        fcGetData={fetchClientAllNotes}
        fcLoadSetValues={loadSetValues}
      />
    </>
  )
}

export default memo(ButtonAdd)
