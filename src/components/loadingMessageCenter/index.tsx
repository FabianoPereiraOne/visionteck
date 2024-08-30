import { schemaAssets } from "@/schemas/others/assets"
import { LoadingMsgProps } from "@/types/verify"
import Link from "next/link"
import { FiArrowLeft } from "react-icons/fi"
import styled from "./style.module.scss"

const LoadingMessageCenter = ({ defaultProps }: { defaultProps: LoadingMsgProps }) => {
 const children = defaultProps?.children

 return (
  <section className={styled.container}>
   <img src={children ? schemaAssets.general.error : schemaAssets.general.error} alt="Image" />
   <h3>{defaultProps?.message}</h3>
   {children ? <div className={styled.contentChildren}>{children}</div> : <Link href={defaultProps?.link?.url ?? ""}><FiArrowLeft /> {defaultProps?.link?.name ?? ""}</Link>}
  </section>
 )
}

export default LoadingMessageCenter