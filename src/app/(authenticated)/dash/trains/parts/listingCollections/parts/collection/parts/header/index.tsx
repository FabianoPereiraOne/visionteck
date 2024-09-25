import { FiLayers } from "react-icons/fi"
import styled from "./styled.module.scss"

export const HeaderPart = ({
  title,
  themeColor
}: {
  title: string
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
