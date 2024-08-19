import Link from "next/link"
import styled from "./style.module.scss"

const Login = () => {
 return (
  <section className={styled.container}>
   <div className={styled.backgroundImage}></div>
   <aside className={styled.sidebar}>
    <figure className={styled.figure}>
     <img src="../../../assets/logo.png" alt="" />
    </figure>
    <h1 className={styled.title}>Registro</h1>
    <p className={styled.paragraph}>Entre na nossa comunidade para ter acesso a benefícios exclusivos e inéditos.</p>
    <form className={styled.form}>
     <input type="text" maxLength={50} placeholder="Nome Completo" required />
     <input type="email" maxLength={50} placeholder="Email" required />
     <input type="tel" maxLength={50} placeholder="Celular" required />
     <input type="text" maxLength={50} placeholder="Profissão" required />
     <input type="password" maxLength={50} placeholder="Senha ( 8 digitos )" required />
     <div className={styled.buttonGroup}>
      <button type="submit">Registrar</button>
      <Link href="/login">Fazer Login</Link>
     </div>
    </form>
   </aside>
  </section>
 )
}


export default Login