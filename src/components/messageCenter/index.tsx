import { schemaAssets } from "@/schemas/others/assets"
import { LoadingMsgProps } from "@/types/verify"
import Link from "next/link"
import { FiArrowLeft } from "react-icons/fi"
import styled from "./style.module.scss"

const MessageCenter = ({
  defaultProps: { message, children, image, link }
}: {
  defaultProps: LoadingMsgProps
}) => {
  return (
    <section className={styled.container}>
      <img src={image ? image : schemaAssets.general.error} alt='Image' />
      <h3>{message}</h3>
      {children && <div className={styled.contentChildren}>{children}</div>}

      {link && (
        <Link href={link?.url ?? ""}>
          <FiArrowLeft /> {link?.name ?? ""}
        </Link>
      )}
    </section>
  )
}

export default MessageCenter
