import styled from "./style.module.scss"

export const TitlePart = () => {
  return (
    <div className={styled.container}>
      <h2 className={styled.title}>Configurações</h2>
      <h4 className={styled.subtitle}>
        Aqui você pode consultar e ajustar as informações da sua conta de forma
        simples e rápida. Personalize sua experiência ao atualizar dados.
      </h4>
    </div>
  )
}
