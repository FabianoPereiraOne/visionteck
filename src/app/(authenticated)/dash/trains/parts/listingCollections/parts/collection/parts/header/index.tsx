"use server"
import { FiLayers } from "react-icons/fi"
import styled from "./styled.module.scss"

export const HeaderPart = ({
  title,
  id,
  themeColor
}: {
  title: string
  id: number
  themeColor: string
}) => {
  return (
    <div className={styled.container}>
      <div className={styled.contentTitle}>
        <FiLayers color={themeColor} />
        <p className={styled.title}>{title}</p>
      </div>
    </div>
  )
}
