import LandingComponent from "@/components/landingComponent"
import styled from "./style.module.scss"

export default function Home() {
  return (
    <main className={styled.container}>
      <LandingComponent />
    </main>
  )
}
