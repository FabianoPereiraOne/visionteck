"use client"
import Popup from "@/components/popup"
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
import styled from "./style.module.scss"

const ButtonAdd = () => {
  const [open, setOpen] = useState(false)
  const [update, setUpdate] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register, reset, getValues, setValue } = useForm()
  const { displayErrors } = useDisplayErrors()

  const handlerTogglePopup = () => {
    setOpen(internalValue => !internalValue)
  }

  const handlerSubmit = async () => {
    setLoading(true)
    const dataCreate = getValues()

    const { success, data, error } = notesSchema.safeParse(dataCreate)

    if (!success) {
      setLoading(false)
      return displayErrors(error?.errors)
    }

    try {
      await fetchCreateNote(data as NoteProps).then(() => {
        setLoading(false)
        toast.success("Nota Criada com sucesso.")
        reset()
      })
    } catch (error) {
      setLoading(false)
      console.error(error)
      toast.error("Erro ao criar nova nota.")
    }
  }

  const handlerDeleteNote = async (note: NoteProps) => {
    const id = note?.id

    if (!id) return toast.error("Não foi possível deletar nota.")

    try {
      await fetchDeleteNote({ id }).then(() => {
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

  const handlerUpdateNote = async () => {
    const note = getValues()
    const id = note?.id

    if (!id) return toast.error("Não foi possível atualizar nota.")

    try {
      await fetchUpdateNote({ id, data: note }).then(() => {
        toast.success("Nota atualizada com sucesso.")
      })
    } catch (error) {
      console.error(error)
      toast.error("Erro ao atualizar nota.")
    }
  }

  return (
    <>
      <button className={styled.btnAdd} onClick={handlerTogglePopup}>
        <FiPlus />
      </button>
      {open && (
        <Popup
          fcEdit={loadSetValues}
          fcDel={handlerDeleteNote}
          fcSubmit={update ? handlerUpdateNote : handlerSubmit}
          layout={layoutAddNote({ register })}
          fcToggle={handlerTogglePopup}
          loading={loading}
          fcGetData={fetchClientAllNotes}
          update={update}
        />
      )}
    </>
  )
}

export default memo(ButtonAdd)
