"use client"
import { PopupProps } from "@/types/popup"
import { FiXCircle } from "react-icons/fi"
import ButtonSubmit from "./parts/buttonSubmit"
import DataView from "./parts/dataView"
import styled from "./style.module.scss"

const Popup = ({
  fcToggle,
  fcSubmit,
  fcEdit,
  fcDel,
  layout,
  data,
  update
}: PopupProps) => {
  const handlerClosePopup = (event: any) => {
    const isContainer = event?.target?.id

    if (!isContainer || isContainer !== "cPopup") return

    fcToggle()
  }

  return (
    <div
      id='cPopup'
      className={styled.containerPopup}
      onClick={handlerClosePopup}
    >
      <article className={styled.popup}>
        <button className={styled.btnClose} onClick={fcToggle}>
          <FiXCircle />
        </button>
        <div className={styled.titleGroup}>
          <h4>{layout?.title}</h4>
          <p>{layout?.subtitle}</p>
          <hr />
        </div>
        <form className={styled.form} action={fcSubmit}>
          {layout?.inputs?.map(element => {
            return element
          })}
          <ButtonSubmit layout={layout} update={update} />
        </form>
        <div className={styled.containerView}>
          <hr />
          <h6>{layout?.listView}</h6>
          <DataView fcDel={fcDel} fcEdit={fcEdit} data={data} />
        </div>
      </article>
    </div>
  )
}

export default Popup
