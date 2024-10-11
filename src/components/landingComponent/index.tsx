import { schemaAssets } from "@/schemas/others/assets"
import Link from "next/link"
import { FiArrowRight, FiLogIn } from "react-icons/fi"
import styled from "./style.module.scss"

const LandingComponent = () => {
  return (
    <div>
      <header className={styled.header}>
        <figure className={styled.contentLogo}>
          <img src={schemaAssets.general.logo} alt='Vision Teck' />
        </figure>
        <Link href='/login'>
          <FiLogIn /> Acessar
        </Link>
      </header>
      <section className={styled.body}>
        <article className={styled.popup}>
          <h1>Desperte o investidor que há em você!</h1>
          <p>
            Vision Teck transformando o mundo atráves dos investimentos, aqui
            oferecemos conteúdos exclusivos e consultorias em investimentos para
            guiá-lo rumo a decisões financeiras mais inteligentes.
          </p>
          <Link href='/login'>
            <FiArrowRight /> Conhecer agora
          </Link>
        </article>
      </section>
    </div>
  )
}

export default LandingComponent
