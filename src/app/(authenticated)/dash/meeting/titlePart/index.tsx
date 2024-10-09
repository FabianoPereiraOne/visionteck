import styled from "./style.module.scss"

export const TitlePart = () => {
  return (
    <div className={styled.container}>
      <h2 className={styled.title}>Agende uma Consultoria</h2>
      <h3 className={styled.subtitle}>
        Garanta uma orientação personalizada para alcançar seus objetivos
        financeiros com especialistas no mercado.
      </h3>
    </div>
  )
}
