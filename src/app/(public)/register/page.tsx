'use client'
import useDisplayErrors from "@/hooks/useDisplayErrors"
import { userCreateSchema } from "@/schemas/api/users"
import { schemaAssets } from "@/schemas/others/assets"
import { createAccount } from "@/utils/fetch/register/create"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast'
import PulseLoader from "react-spinners/PulseLoader"
import styled from "./style.module.scss"

const Register = () => {
 const { displayErrors } = useDisplayErrors()
 const { handleSubmit, register, reset } = useForm()
 const [loading, setLoading] = useState(false)

 const handlerSubmitRegister = async (dataCreate: any) => {
  setLoading(true)

  const { success, data, error } = userCreateSchema.safeParse(dataCreate)

  if (!success) {
   setLoading(false)
   return displayErrors(error?.errors)
  }

  const user = {
   name: data.name,
   email: data.email,
   phone: data.phone,
   profession: data.profession
  }

  const result = await createAccount({ user, password: data?.password })
  const response = await result.json()

  if (!result.ok) {
   console.error(response?.error)
   setLoading(false)
   return toast.error("Ops! Erro ao criar conta.")
  }

  setLoading(false)
  reset()
  toast.success(response?.success)
 }

 return (
  <section className={styled.container}>
   <div className={styled.backgroundImage}></div>
   <aside className={styled.sidebar}>
    <figure className={styled.figure}>
     <img src={schemaAssets.general.logo} alt="Logo" />
    </figure>
    <h1 className={styled.title}>Registro</h1>
    <p className={styled.paragraph}>Entre na nossa comunidade para ter acesso a benefícios exclusivos e inéditos.</p>
    <form className={styled.form} onSubmit={handleSubmit(handlerSubmitRegister)}>
     <input type="text" maxLength={50} placeholder="Nome Completo" required {...register("name")} />
     <input type="email" maxLength={50} placeholder="Email" required {...register("email")} />
     <input type="tel" maxLength={50} placeholder="Celular" required {...register("phone")} />
     <input type="text" maxLength={50} placeholder="Profissão" required {...register("profession")} />
     <input type="password" maxLength={50} placeholder="Senha ( 8 dígitos )" required {...register("password")} />
     <div className={styled.buttonGroup}>
      <button disabled={loading} type="submit">{loading ? <PulseLoader color="#f9f9f9" size={10} /> : "Registrar-se"}</button>
      <Link href="/login">Login</Link>
     </div>
    </form>
   </aside>
  </section>
 )
}


export default Register