"use client"
import Popup from "@/components/popup"
import useDisplayErrors from "@/hooks/useDisplayErrors"
import { layoutAddNote } from "@/layouts/note/add"
import { notesSchema } from "@/schemas/api/notes"
import { NoteProps } from "@/types/note"
import { fetchDeleteNote } from "@/utils/fetch/notes/delete"
import { fetchAllNotes } from "@/utils/fetch/notes/getAll"
import { fetchCreateNote } from "@/utils/fetch/notes/post"
import { memo, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { FiPlus } from "react-icons/fi"
import styled from "./style.module.scss"

const ButtonAdd = () => {
 const [open, setOpen] = useState(false)
 const [loading, setLoading] = useState(false)
 const [notes, setNotes] = useState<any>([])
 const { register, handleSubmit, reset } = useForm()
 const { displayErrors } = useDisplayErrors()

 const handlerTogglePopup = () => {
  setOpen(internalValue => !internalValue)
 }

 const handlerSubmit = async (data: any) => {
  setLoading(true)

  const { success, error } = notesSchema.safeParse(data)

  if (!success) {
   setLoading(false)
   return displayErrors(error?.errors)
  }

  try {
   const result = await fetchCreateNote(data)
   const response = await result.json()
   const note = response?.data

   setNotes([note, ...notes])
   setLoading(false)
   toast.success(response.success)
   reset()
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
   const result = await fetchDeleteNote({ id })
   const response = await result.json()
   const listNotes = notes.filter((note: NoteProps) => note?.id !== id)

   setNotes(listNotes)
   toast.success(response.success)
  } catch (error) {
   console.error(error)
   toast.error("Erro ao criar nova nota.")
  }
 }

 const loadDataNotes = async () => {
  try {
   const result = await fetchAllNotes()
   const response = await result.json()

   setNotes(response.data)
  } catch (error) {
   console.error(error)
   toast.error("Erro ao carregar notas.")
  }
 }

 useEffect(() => {
  if (open) loadDataNotes()
 }, [open])

 return (
  <>
   <button className={styled.btnAdd} onClick={handlerTogglePopup}>
    <FiPlus />
   </button>
   {open && (
    <Popup
     fcEdit={() => { }}
     fcDel={handlerDeleteNote}
     loading={loading}
     fcSubmit={handlerSubmit}
     fcHandleSubmit={handleSubmit}
     fcToggle={handlerTogglePopup}
     layout={layoutAddNote({ register })}
     data={notes}
    />
   )}
  </>
 )
}

export default memo(ButtonAdd)
