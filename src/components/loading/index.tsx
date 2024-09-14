import { memo } from "react"
import PulseLoader from "react-spinners/PulseLoader"
import styled from "./style.module.scss"

const Loading = () => {
  return (
    <div className={styled.container}>
      <p>Carregando dados</p>
      <PulseLoader color='#FF9124' size={10} />
    </div>
  )
}

export default memo(Loading)
