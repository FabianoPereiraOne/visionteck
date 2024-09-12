import { useVerifyAdmin } from "@/hooks/useVerifyAdmin"
import { getAllNotes } from "@/services/prisma/notes/getAll"
import { format } from "date-fns"
import { ptBR } from 'date-fns/locale'
import { memo } from "react"
import { FiBookmark } from "react-icons/fi"
import ButtonAdd from "./parts/buttonAdd"
import styled from "./style.module.scss"

const Notes = async () => {
 const notes = await getAllNotes()

 const { isAdmin } = await useVerifyAdmin()

 if (!notes) return <></>

 return (
  <section className={styled.container}>
   <section className={styled.contentTitle}>
    <h3 className={styled.title}><FiBookmark />Notas de atualização</h3>
    {isAdmin && <ButtonAdd />}
   </section>
   <section className={styled.notes}>
    {notes.map((note) => {
     return (
      <article key={note?.id} className={styled.note}>
       <strong className={styled.noteTitle}>
        &#x2022;{" "}
        {note?.title}
        <span style={{ background: note?.bulletColor }}>{note?.bullet}</span>
       </strong>
       <p className={styled.description}>
        {note?.description} -
        {format(note?.createdAt.toISOString(), "dd MMM yyyy", { locale: ptBR })}
       </p>
      </article>
     )
    })}
   </section>
  </section>
 )
}

export default memo(Notes)