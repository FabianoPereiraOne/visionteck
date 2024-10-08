import { Plan } from "@prisma/client"
import { FiDollarSign, FiFileText, FiLayers, FiType } from "react-icons/fi"
import styled from "./style.module.scss"

export const PlanData = ({ plan }: { plan: Plan | null }) => {
  if (!plan) return <></>

  return (
    <div className={styled.container}>
      <p className={styled.title}>
        <FiLayers />
        Plano Atual
      </p>

      <div className={styled.contentInputs}>
        <div className={styled.wrapper}>
          <input name='title' value={plan?.title} />
          <FiType />
        </div>
        <div className={styled.wrapper}>
          <input name='price' value={plan?.price} />
          <FiDollarSign />
        </div>
        <div className={styled.wrapperTextArea}>
          <textarea name='description' value={plan?.description} />
          <FiFileText />
        </div>
      </div>
    </div>
  )
}
