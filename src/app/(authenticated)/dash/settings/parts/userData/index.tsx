import { dataUser } from "@/types/user"
import {
  FiBriefcase,
  FiLock,
  FiMail,
  FiPhone,
  FiType,
  FiUser
} from "react-icons/fi"
import styled from "./style.module.scss"

export const UserData = ({ data }: { data: dataUser }) => {
  return (
    <div className={styled.container}>
      <p className={styled.title}>
        <FiUser />
        Dados Pessoais
      </p>

      <div className={styled.contentInputs}>
        <div className={styled.wrapper}>
          <input name='name' value={data?.name} />
          <FiUser />
        </div>
        <div className={styled.wrapper}>
          <input name='email' value={data?.email} />
          <FiMail />
        </div>
        <div className={styled.wrapper}>
          <input name='phone' value={data?.phone} />
          <FiPhone />
        </div>
        <div className={styled.wrapper}>
          <input name='profession' value={data?.profession} />
          <FiBriefcase />
        </div>
        <div className={styled.wrapper}>
          <input name='type' value={data?.type} />
          <FiType />
        </div>
        <div className={styled.wrapper}>
          <input name='password' value={data?.password} />
          <FiLock />
        </div>
      </div>
    </div>
  )
}
