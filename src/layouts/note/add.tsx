import { FiLayers, FiPlus } from "react-icons/fi";
import styled from "../global/styles/index.module.scss";

export const layoutAddNote = {
  title: "Notas de atualização",
  subtitle: `Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.`,
  buttonSubmit: <><FiPlus />Adicionar novo</>,
  listView: <><FiLayers /> Cadastradas</>,
  inputs: [
    <input key="title" id="title" className={styled.input} name="title" data-tag="input" type='text' maxLength={50} placeholder='Titulo' required />,
    <textarea key="description" className={styled.textarea} id="description" name="description" data-tag="textarea" placeholder='Descrição' required />
  ]
}
