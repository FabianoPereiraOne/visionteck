import { VisionContextProvider } from "@/context"
import "@/styles/globals.scss"
import { config } from "@/styles/toast"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "react-hot-toast"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"]
})

export const metadata: Metadata = {
  title: "Pagina Inicial | Vision Teck",
  description: "Vision Teck investindo em um mundo melhor",
  icons: {
    icon: "/assets/favicon.png"
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='pt-BR'>
      <body className={inter.className}>
        <VisionContextProvider>
          {children}
          <Toaster position='top-right' toastOptions={config} />
        </VisionContextProvider>
      </body>
    </html>
  )
}
