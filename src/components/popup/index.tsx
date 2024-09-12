import { PopupProps } from "@/types/popup"
import { FiEdit, FiTrash, FiXCircle } from "react-icons/fi"
import styled from "./style.module.scss"

const Popup = ({ fcToggle, layout }: PopupProps) => {

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
    <form className={styled.form}>
     {layout?.inputs.map((element) => {
      return element
     })}
     <button type="submit" className={styled.btnSubmit}>
      {layout?.buttonSubmit}
     </button>
    </form>
    <div className={styled.containerView}>
     <hr />
     <h6>
      {layout?.listView}
     </h6>
     <ul className={styled.listView}>
      <li className={styled.row}>
       <p>&#x2022;{" "} Atualização 01</p>
       <div className={styled.btnGroup}>
        <button>
         <FiEdit />
        </button>
        <button>
         <FiTrash />
        </button>
       </div>
      </li>
      <li className={styled.row}>
       <p>&#x2022;{" "} Atualização 02</p>
       <div className={styled.btnGroup}>
        <button>
         <FiEdit />
        </button>
        <button>
         <FiTrash />
        </button>
       </div>
      </li>
      <li className={styled.row}>
       <p>&#x2022;{" "} Atualização 03</p>
       <div className={styled.btnGroup}>
        <button>
         <FiEdit />
        </button>
        <button>
         <FiTrash />
        </button>
       </div>
      </li>
     </ul>
    </div>
   </article>
  </div>
 )
}

export default Popup