"use server"
import { NoteProps } from "@/types/note"
import { fetchAllNotes } from "@/utils/fetch/notes/getAll"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { FiBookmark } from "react-icons/fi"
import ButtonAdd from "./parts/buttonAdd"
import styled from "./style.module.scss"

const Notes = async ({ isAdmin }: { isAdmin: boolean }) => {
  const result = await fetchAllNotes()
  const response = await result.json()
  const notes: NoteProps[] = response?.data ?? []

  if (notes && notes.length <= 0) return <></>

  return (
    <section className={styled.container}>
      <section className={styled.contentTitle}>
        <h3 className={styled.title}>
          <FiBookmark />
          Notas de atualização
        </h3>
        {isAdmin && <ButtonAdd notes={notes} />}
      </section>
      <section className={styled.notes}>
        {notes.map((note: NoteProps) => {
          return (
            <article key={note?.id} className={styled.note}>
              <strong className={styled.noteTitle}>
                &#x2022; {note?.title}
                <span style={{ background: note?.bulletColor }}>
                  {note?.bullet}
                </span>
              </strong>
              <p className={styled.description}>
                {note?.description} -
                {format(
                  new Date(note?.createdAt).toISOString(),
                  "dd MMM yyyy",
                  {
                    locale: ptBR
                  }
                )}
              </p>
            </article>
          )
        })}
      </section>
    </section>
  )
}

export default Notes
