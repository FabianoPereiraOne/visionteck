"use client"
import { PopupProps } from "@/types/popup"
import { Suspense, useMemo } from "react"
import { FiXCircle } from "react-icons/fi"
import PulseLoader from "react-spinners/PulseLoader"
import DataView from "./parts/dataView"
import styled from "./style.module.scss"

const Popup = ({
  fcToggle,
  fcSubmit,
  fcEdit,
  fcDel,
  layout,
  loading,
  fcGetData,
  update
}: PopupProps) => {
  const load = useMemo(() => loading, [loading])

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
          {layout?.inputs.map(element => {
            return element
          })}
          <button type='submit' className={styled.btnSubmit}>
            {load ? (
              <PulseLoader color='#f9f9f9' size={10} />
            ) : update ? (
              layout?.buttonUpdate
            ) : (
              layout?.buttonSubmit
            )}
          </button>
        </form>
        <div className={styled.containerView}>
          <hr />
          <h6>{layout?.listView}</h6>
          <Suspense fallback={<h1>Carregando...</h1>}>
            <DataView fcDel={fcDel} fcEdit={fcEdit} fcGetData={fcGetData} />
          </Suspense>
        </div>
      </article>
    </div>
  )
}

export default Popup
