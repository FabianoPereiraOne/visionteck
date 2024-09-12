'use client'
import { FieldValues, UseFormRegister } from "react-hook-form";
import { FiLayers, FiPlus } from "react-icons/fi";
import styled from "../global/styles/index.module.scss";

export const layoutAddNote = ({ register }: { register: UseFormRegister<FieldValues> }) => {
  return {
    title: "Notas de atualização",
    subtitle: `Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.`,
    buttonSubmit: <><FiPlus />Adicionar novo</>,
    listView: <><FiLayers /> Cadastradas</>,
    inputs: [
      <input key="title" id="title" className={styled.input} data-tag="input" type='text' maxLength={50} placeholder='Titulo' {...register("title")} />,
      <textarea key="description" className={styled.textarea} id="description" data-tag="textarea" placeholder='Descrição' {...register("description")} />
    ]
  }
}
