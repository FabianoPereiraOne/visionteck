import { InterFont, MetaDataPage } from "@/schemas/pages/config"
import "@/styles/globals.scss"
import { Metadata } from "next"

export const metadata: Metadata = MetaDataPage({ title: "Login" })

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <section className={InterFont.className}>{children}</section>
}
