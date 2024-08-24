import { schemaAssets } from "@/schemas/others/assets"
import Link from "next/link"
import { FiArrowLeft } from "react-icons/fi"
import styled from "./style.module.scss"

const ErrorComponent = ({ message, link }: { message: string, link: { url: string, name: string } }) => {
 return (
  <section className={styled.container}>
   <img src={schemaAssets.general.error} alt="Error image" />
   <h3>{message}</h3>
   <Link href={link?.url}><FiArrowLeft /> {link?.name}</Link>
  </section>
 )
}

export default ErrorComponent