'use client'
import { PopupProps } from "@/types/popup"
import { FiEdit, FiTrash, FiXCircle } from "react-icons/fi"
import PulseLoader from "react-spinners/PulseLoader"
import styled from "./style.module.scss"

const Popup = ({ fcToggle, fcSubmit, fcHandleSubmit, fcEdit, fcDel, layout, loading, data }: PopupProps) => {

 const handlerClosePopup = (event: any) => {
  const isContainer = event?.target?.id

  if (!isContainer || isContainer !== "cPopup") return

  fcToggle()
 }

 return (
  <div id="cPopup" className={styled.containerPopup} onClick={handlerClosePopup}>
   <article className={styled.popup}>
    <button className={styled.btnClose} onClick={fcToggle}>
     <FiXCircle />
    </button>
    <div className={styled.titleGroup}>
     <h4>{layout?.title}</h4>
     <p>
      {layout?.subtitle}
     </p>
     <hr />
    </div>
    <form className={styled.form} onSubmit={fcHandleSubmit(fcSubmit)}>
     {layout?.inputs.map((element) => {
      return element
     })}
     <button type="submit" className={styled.btnSubmit}>
      {loading ? <PulseLoader color="#f9f9f9" size={10} /> : layout?.buttonSubmit}
     </button>
    </form>
    <div className={styled.containerView}>
     <hr />
     <h6>
      {layout?.listView}
     </h6>
     <ul className={styled.listView}>
      {data?.length > 0 ? data.map((item: { id: string, title: string }) => {
       return (
        <li className={styled.row} key={item?.id}>
         <p>&#x2022;{" "} {item?.title}</p>
         <div className={styled.btnGroup}>
          <button onClick={() => fcEdit(item)}>
           <FiEdit />
          </button>
          <button onClick={() => fcDel(item)}>
           <FiTrash />
          </button>
         </div>
        </li>
       )
      }) : <p>Nenhum item cadastrado.</p>}
     </ul>
    </div>
   </article>
  </div>
 )
}

export default Popup