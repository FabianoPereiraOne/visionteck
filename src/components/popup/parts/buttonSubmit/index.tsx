"use client"
import { LayoutType } from "@/types/layout"
import { useFormStatus } from "react-dom"
import PulseLoader from "react-spinners/PulseLoader"
import styled from "./style.module.scss"

const ButtonSubmit = ({
  layout,
  update
}: {
  update: boolean
  layout: LayoutType
}) => {
  const { pending } = useFormStatus()

  return (
    <button type='submit' className={styled.btnSubmit}>
      {pending ? (
        <PulseLoader color='#f9f9f9' size={10} />
      ) : update ? (
        layout?.buttonUpdate
      ) : (
        layout?.buttonSubmit
      )}
    </button>
  )
}

export default ButtonSubmit
