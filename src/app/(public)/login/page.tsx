import { userCreateSchema } from "@/schemas/api/users";
import { schemaAssets } from "@/schemas/others/assets";
import Link from "next/link";
import { useForm } from "react-hook-form";
import styled from "./style.module.scss";

const Login = () => {
 const { handleSubmit, register } = useForm()

 const handlerSubmitLogin = (dataCreate: any) => {

  const { success, data, error } = userCreateSchema.safeParse(dataCreate)

  console.log(data)
 }

 return (
  <section className={styled.container}>
   <div className={styled.backgroundImage}></div>
   <aside className={styled.sidebar}>
    <figure className={styled.figure}>
     <img src={schemaAssets.general.logo} alt="" />
    </figure>
    <h1 className={styled.title}>Login</h1>
    <p className={styled.paragraph}>Acesse sua conta para continuar sua jornada de aprendizado.</p>
    <form className={styled.form} onSubmit={handleSubmit(handlerSubmitLogin)}>
     <input type="text" maxLength={50} placeholder="Nome Completo" required {...register("name")} />
     <input type="email" maxLength={50} placeholder="Email" required {...register("email")} />
     <input type="tel" maxLength={50} placeholder="Celular" required {...register("phone")} />
     <input type="text" maxLength={50} placeholder="Profissão" required {...register("profession")} />
     <input type="password" maxLength={50} placeholder="Senha ( 8 dígitos )" required {...register("password")} />
     <div className={styled.buttonGroup}>
      <button type="submit">Login</button>
      <Link href="/register">Registrar-se</Link>
     </div>
    </form>
   </aside>
  </section>
 )
}


export default Login