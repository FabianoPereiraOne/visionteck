"use client"
import useDisplayErrors from "@/hooks/useDisplayErrors";
import { schemaLogin } from "@/schemas/api/users";
import { schemaAssets } from "@/schemas/others/assets";
import { userSession } from "@/schemas/others/config";
import { fetchLogin } from "@/utils/fetch/login/post";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import PulseLoader from "react-spinners/PulseLoader";
import styled from "./style.module.scss";

const Login = () => {
 const { handleSubmit, register, reset } = useForm()
 const { displayErrors } = useDisplayErrors()
 const router = useRouter()
 const [loading, setLoading] = useState(false)

 const handlerSubmitLogin = async (dataLogin: any) => {
  setLoading(true)

  const { success, data, error } = schemaLogin.safeParse(dataLogin)

  if (!success) {
   setLoading(false)
   return displayErrors(error?.errors)
  }

  const result = await fetchLogin(data)
  const response = await result.json()

  if (!result.ok) {
   console.error(response?.error)
   setLoading(false)
   return toast.error(response?.error)
  }

  if (typeof window !== "undefined") sessionStorage.setItem(userSession, JSON.stringify(response.data))

  setLoading(false)
  reset()
  toast.success(response?.success)
  setTimeout(() => router.push("/dash"), 1000)
 }


 return (
  <section className={styled.container}>
   <div className={styled.backgroundImage}></div>
   <aside className={styled.sidebar}>
    <figure className={styled.figure}>
     <img src={schemaAssets.general.logo} alt="Logo" />
    </figure>
    <h1 className={styled.title}>Login</h1>
    <p className={styled.paragraph}>Acesse nossa comunidade para ter acesso a benefícios exclusivos e inéditos.</p>
    <form className={styled.form} onSubmit={handleSubmit(handlerSubmitLogin)}>
     <input type="email" maxLength={50} placeholder="Email" required {...register("email")} />
     <input type="password" maxLength={50} placeholder="Senha ( 8 dígitos )" required {...register("password")} />
     <div className={styled.buttonGroup}>
      <button disabled={loading} type="submit">{loading ? <PulseLoader color="#f9f9f9" size={10} /> : "Login"}</button>
      <Link href="/register">Registrar-se</Link>
     </div>
    </form>
   </aside>
  </section>
 )
}


export default Login